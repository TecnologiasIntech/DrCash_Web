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

@Injectable()
export class TransactionService {

    numberOfCurrentTransactions: number = 0;
    currentTransactions: Observable<Transaction[]>;
    initialCash: number;

    public myCurrentTransactions: Transaction[] = [];

    constructor(private db: AngularFireDatabase) {
    }

    getTransaction(key: number) {
        return this.db.object('transactions/' + key).valueChanges()
    }

    getCurrentTransactions() {
        return new Promise(resolve => {

            this.db.list('transactions', ref => ref
                .orderByChild('dateRegistered')
                .startAt(DateService.getInitialCurrentDate())
                .endAt(DateService.getEndCurrentDate())
            ).valueChanges().take(1).subscribe((snapshot: Transaction[]) => {
                // debugger
                this.myCurrentTransactions = snapshot;
                console.log(snapshot)
            })
        })
    }

    getMyCurrentTransactions() {
        return new Promise((resolve, reject) => {
            this.db.list(`clinicas/${Globals.userInfo.clinic}/${Globals.userInfo.username}`, ref => ref
                .orderByChild('keyTransaction')
                .startAt(DateService.getInitialCurrentDate())
                .endAt(DateService.getEndCurrentDate())
            ).valueChanges().subscribe((snapshot: any) => {
                if (snapshot.length > 0) {
                    for (let item in snapshot) {
                        this.db.object(`transactions/${snapshot[item].keyTransaction}`).valueChanges()
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
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].credit)) {
                            totalRegistered += this.myCurrentTransactions[item].check;
                        }
                        break;

                    case TRANSACTIONTYPE.CASHOUT || TRANSACTIONTYPE.REFUND:
                        if (!ValidationService.errorInField(this.myCurrentTransactions[item].cash)) {
                            totalRegistered -= this.myCurrentTransactions[item].cash;
                        }
                        break;
                }
            } else {
                this.initialCash = this.myCurrentTransactions[item].cash;
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
        this.db.list('closedTransactions').update(closeTransaction.datetime, closeTransaction);
    }

    updateTransaction(transactionKey: string, ammount: number, transaction: Transaction) {
        this.db.list('transactions').update(transactionKey.toString(), {
            amountCharged: ammount,
            comment: transaction
        })
    }

    static getDefaultValuesToTransaction() {
        //TODO Asignar valor a RegisterID
        //TODO Asignar valor a modifiedById
        //TODO Cambiar el valor de userKey por el valor de Globals
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
            registerId: "1",
            modifiedById: Globals.userInfo.userId
        }
    }

}
