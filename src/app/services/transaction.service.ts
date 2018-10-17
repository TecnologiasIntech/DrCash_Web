import {Injectable} from '@angular/core';
import {
    AngularFireDatabase, DatabaseQuery, DatabaseReference,
    QueryFn
} from "angularfire2/database";
import {Transaction} from "../interfaces/transaction";
import {Observable} from "rxjs/Observable";
import {userInfo} from "os";
import {Globals} from "../statics/globals";
import {DateService} from "./date.service";
import {ClosedTransaction} from "../interfaces/closed-transaction";
import {TRANSACTIONTYPE} from "../enums/enums";
import {ValidationService} from "./validation.service";
import 'rxjs/add/operator/take'
import {onChildAdded} from "angularfire2/database-deprecated";
import {denodeify, reject} from "q";
import * as _ from "lodash";

@Injectable()
export class TransactionService {

    numberOfCurrentTransactions: number = 0;
    currentTransactions: Observable<Transaction[]>;
    public initialCash: number;

    public myCurrentTransactions: Transaction[] = [];

    constructor(private db: AngularFireDatabase,
                private _dateService: DateService) {
        // this.getMyCurrentTransactions()
    }

    getTransaction(key: number) {
        return this.db.object('transactions/' + key).valueChanges()
    }

    getCurrentTransactions() {
        return new Promise((resolve, reject) => {

            this.db.list('transactions', ref => ref
                .orderByChild('dateRegistered')
                .startAt(DateService.getInitialCurrentDate())
                .endAt(DateService.getEndCurrentDate())
            ).valueChanges().take(1).subscribe((snapshot: Transaction[]) => {
                // debugger
                if (snapshot.length > 0) {
                    this.myCurrentTransactions = snapshot;
                    resolve(snapshot);
                } else {
                    reject();
                }
            })
        })
    }

    getMyCurrentTransactions() {
        return new Promise((resolve, reject) => {
            this.db.list(`clinicas/${Globals.userInfo.clinic}/${Globals.userInfo.username}`, ref => ref
                .orderByChild('keyTransaction')
                .startAt(parseInt(DateService.getInitialCurrentDate().toString() + Globals.userInfo.userId))
                .endAt(parseInt(DateService.getEndCurrentDate().toString() + Globals.userInfo.userId))
            ).valueChanges().take(1).subscribe((snapshot: any) => {
                this.myCurrentTransactions = [];
                if (snapshot.length > 0) {
                    for (let item in snapshot) {
                        this.db.object(`transactions/${snapshot[item].keyTransaction}`).valueChanges().take(1)
                            .subscribe((snapshotTrn: Transaction) => {
                                this.myCurrentTransactions.push(snapshotTrn);
                                if (item == (snapshot.length - 1).toString()) {
                                    resolve(this.myCurrentTransactions);
                                }
                            })
                    }
                } else {
                    reject();
                }
            })
        })
    }

    getTotalRegistered(): number {
        let totalRegistered: number = 0;
        for (let item in this.myCurrentTransactions) {
            if (this.myCurrentTransactions[item].type != TRANSACTIONTYPE.INITIALCASH) {
                switch (this.myCurrentTransactions[item].type) {

                    case TRANSACTIONTYPE.CASHIN:
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].cash)) {
                            totalRegistered += this.myCurrentTransactions[item].cash;
                        }
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].credit)) {
                            totalRegistered += this.myCurrentTransactions[item].credit;
                        }
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].check)) {
                            totalRegistered += this.myCurrentTransactions[item].check;
                        }
                        break;

                    case TRANSACTIONTYPE.CASHOUT:
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].cash)) {
                            totalRegistered -= this.myCurrentTransactions[item].cash;
                        }
                        break;

                    case TRANSACTIONTYPE.REFUND:
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].cash)) {
                            totalRegistered -= this.myCurrentTransactions[item].cash;
                        }
                        break;
                }
            } else {
                this.initialCash = this.myCurrentTransactions[item].cash;
                totalRegistered += this.myCurrentTransactions[item].cash;
            }
        }
        return totalRegistered;
    }

    setTransaction(transaction: Transaction) {
        this.db.list('transactions').update(transaction.dateRegistered.toString() + Globals.userInfo.userId.toString(), transaction);
        this.db.list('clinicas').update(Globals.userInfo.clinic + "/" + Globals.userInfo.username + "/" + transaction.dateRegistered + Globals.userInfo.userId, {
            keyTransaction: parseInt(transaction.dateRegistered + Globals.userInfo.userId.toString())
        });
    }

    setClosedTransaction(closeTransaction: ClosedTransaction) {
        this.db.list('closedTransactions').update(closeTransaction.datetime.toString(), closeTransaction);
    }

    updateTransaction(transaction: Transaction) {
        this.db.list('transactions').update(transaction.dateRegistered.toString() + transaction.modifiedById, transaction)
    }

    searchDailyTransactions(transactionNumber: number, comment: string, patientName: string, dateFrom: number, dateTo: number) {
        return new Promise((resolve, reject) => {
            if (!ValidationService.errorInField(transactionNumber)) {
                this.getTransaction(transactionNumber).take(1).subscribe((snapshot: Transaction) => {
                    let transaction: Transaction[] = [];
                    transaction.push(snapshot);
                    resolve(transaction);
                })
            } else if (!ValidationService.errorInField(dateFrom) && ValidationService.errorInField(dateTo)) {
                this.db.list('transactions', ref => ref
                    .orderByChild('dateRegistered')
                    .startAt(dateFrom)
                ).valueChanges().take(1).subscribe((snapshot: Transaction[]) => {
                    let transactions: Transaction[] = this.filterTransations(snapshot, comment, patientName);
                    resolve(transactions)
                })
            } else if (!ValidationService.errorInField(dateFrom) && !ValidationService.errorInField(dateTo)) {
                this.db.list('transactions', ref => ref
                    .orderByChild('dateRegistered')
                    .startAt(dateFrom)
                    .endAt(dateTo)
                ).valueChanges().take(1).subscribe((snapshot: Transaction[]) => {
                    let transactions: Transaction[] = this.filterTransations(snapshot, comment, patientName);
                    resolve(transactions)
                })
            }
        })
    }

    filterTransations(transactions: Transaction[], comment: string, patientName: string) {
        // debugger
        if (!ValidationService.errorInField(comment) && ValidationService.errorInField(patientName))
            transactions = _.filter(transactions, ['comment', comment]);

        if (ValidationService.errorInField(comment) && !ValidationService.errorInField(patientName))
            transactions = _.filter(transactions, ['patientFirstName', patientName]);

        if (!ValidationService.errorInField(comment) && !ValidationService.errorInField(patientName))
            transactions = _.filter(transactions, {'patientFirstName': patientName, 'comment': comment});

        return transactions;
    }

    searchClosedTransactions(transactionNumber: number, dateFrom: number, dateTo: number) {
        return new Promise((resolve, reject) => {
            if (!ValidationService.errorInField(transactionNumber)) {
                this.getClosedTransaction(transactionNumber).take(1).subscribe((snapshot: ClosedTransaction) => {
                    let transaction: ClosedTransaction[] = [];
                    transaction.push(snapshot);
                    resolve(transaction);
                })
            } else if (!ValidationService.errorInField(dateFrom) && ValidationService.errorInField(dateTo)) {
                this.db.list('closedTransactions', ref => ref
                    .orderByChild('datetime')
                    .startAt(dateFrom)
                ).valueChanges().take(1).subscribe((snapshot: ClosedTransaction[]) => {
                    resolve(snapshot)
                })
            } else if (!ValidationService.errorInField(dateFrom) && !ValidationService.errorInField(dateTo)) {
                this.db.list('closedTransactions', ref => ref
                    .orderByChild('datetime')
                    .startAt(dateFrom)
                    .endAt(dateTo)
                ).valueChanges().take(1).subscribe((snapshot: ClosedTransaction[]) => {
                    resolve(snapshot)
                })
            }
        })
    }

    getClosedTransaction(transactionNumber: number) {
        return this.db.object('closedTransactions/' + transactionNumber.toString()).valueChanges();
    }

    static getDefaultValuesToTransaction() {
        return {
            userKey: Globals.userInfo.username,
            type: -1,
            copayment: false,
            selfPay: false,
            deductible: false,
            labs: false,
            other: false,
            otherComments: "",
            closed: false,
            registerId: Globals.userInfo.registerId,
            modifiedById: Globals.userInfo.userId
        }
    }

    convertTransactionsToPrintPDF(transactions: Transaction[]): any[] {
        let transactionToPrint: any[] = [];
        for (let iteration in transactions) {
            transactionToPrint.push([
                transactions[iteration].dateRegistered.toString() + transactions[iteration].modifiedById,
                transactions[iteration].userKey,
                DateService.getDateLetterBy(transactions[iteration].dateRegistered.toString()),
                transactions[iteration].patientFirstName,
                transactions[iteration].type,
                "$" + (transactions[iteration].amountCharged ? transactions[iteration].amountCharged.toString() : "0.00"),
                "$" + (transactions[iteration].cash ? transactions[iteration].cash.toString() : "0.00"),
                "$" + (transactions[iteration].credit ? transactions[iteration].credit.toString() : "0.00"),
                "$" + (transactions[iteration].check ? transactions[iteration].check.toString() : "0.00"),
                (transactions[iteration].checkNumber ? transactions[iteration].checkNumber : "0"),
                (transactions[iteration].closed ? transactions[iteration].closed : false),
                transactions[iteration].registerId,

            ])
        }
        return transactionToPrint;
    }

    getLeftInRegister(cash: number, fDate: number, tDate: number) {
        return new Promise((resolve, reject) => {
            this.db.list('closedTransactions/', ref => ref
                .orderByChild("datetime")
                .startAt(fDate)
                .endAt(tDate))
                .valueChanges().take(1)
                .subscribe((snapshot: ClosedTransaction[]) => {
                    let closeDate = _.filter(snapshot, ["reg_RegisterID", Globals.userInfo.registerId.toString()]);
                    if (!ValidationService.errorInField(closeDate)) {
                        resolve(closeDate[closeDate.length - 1].leftInRegister);
                    } else {
                        reject();
                    }
                })
        })
    }
}
