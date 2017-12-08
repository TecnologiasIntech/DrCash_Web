import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Transaction} from "../interfaces/transaction";
import {Observable} from "rxjs/Observable";
import {userInfo} from "os";
import {Globals} from "../statics/globals";
import {DateService} from "./date.service";
import {FirebaseListFactoryOpts} from "angularfire2/database/interfaces";
import {ClosedTransaction} from "../interfaces/closed-transaction";
import {TRANSACTIONTYPE} from "../enums/enums";
import {ValidationService} from "./validation.service";

@Injectable()
export class TransactionService {

    transactionsRef: FirebaseListObservable<Transaction[]>;
    closedTransactionsRef: FirebaseListObservable<Transaction[]>;
    numberOfCurrentTransactions:number = 0;
    currentTransactions: Transaction[] = [];
    initialCash:number;

    public myCurrentTransactions: Transaction[] = [];

    constructor(private db: AngularFireDatabase) {
        this.transactionsRef = this.db.list('transactions');
        this.closedTransactionsRef = this.db.list('closedTransactions');
        this.getCurrentTransactions();
    }

    getTransaction(key: number) {
        return this.db.object('transactions/' + key)
    }

    getCurrentTransactions() {
        return new Promise(resolve => {
            this.db.list('transactions', {
                query: {
                    orderByChild: 'dateRegistered',
                    startAt: DateService.getInitialCurrentDate(),
                    endAt: DateService.getEndCurrentDate()
                }
            }).subscribe(result => {
                this.currentTransactions = result;
                resolve(result)
            })
        })
    }

    getMyCurrentTransactions() {
        return new Promise(resolve => {
            this.db.list(`clinicas/${Globals.userInfo.clinic}/${Globals.userInfo.username}`, {
                query: {
                    orderByChild: 'keyTransaction',
                    startAt: DateService.getInitialCurrentDate(),
                    endAt: DateService.getEndCurrentDate()
                }
            }).subscribe(snapshot => {
                this.numberOfCurrentTransactions = snapshot.length;
                for (let item in snapshot) {
                    this.db.object(`transactions/${snapshot[item].keyTransaction}`)
                        .subscribe(snapshotTrn => {
                            this.myCurrentTransactions.push(snapshotTrn);
                            if (item == (snapshot.length - 1).toString()) {
                                resolve(this.myCurrentTransactions);
                            }
                        })
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
            }else{
                this.initialCash = this.myCurrentTransactions[item].cash;
            }
        }
        return totalRegistered;
    }

    getAllTransactions() {
        this.db.list('transactions')
            .$ref
            .orderByChild('dateRegistered')
            .startAt(20171202000000)
            // .endAt(20171204235959)
            .once('value', (snapshot) => {
                console.log(snapshot.val())
            })
    }

    getTransactionsByRange(startAt: number, endAt) {
        //TODO verificar esta consulta
        // return this.db.list('transactions', ref => ref
        //     .orderByChild('date')
        //     .startAt(startAt)
        //     .end(endAt))
    }

    setTransaction(transaction: Transaction) {
        this.transactionsRef.set(transaction.dateRegistered.toString() + Globals.userInfo.userId.toString(), transaction);
    }

    updateTransaction(transactionKey: string, ammount: number, transaction: Transaction) {

        this.transactionsRef.update(transactionKey.toString(), {
            amountCharged: ammount,
            comment: transaction
        })

    }

    static getDefaultValuesToTransaction() {
        //TODO Asignar valor a RegisterID
        //TODO Asignar valor a modifiedById
        //TODO Cambiar el valor de userKey por el valor de Globals
        return {
            userKey: "carlos",
            type: -1,
            copayment: false,
            selfPay: false,
            deductible: false,
            labs: false,
            other: false,
            otherComments: "",
            closed: false,
            registerId: "",
            modifiedById: 1
        }
    }

    setClosedTransaction(closeTransaction: ClosedTransaction) {
        this.closedTransactionsRef.set(closeTransaction.datetime, closeTransaction);
    }

    getCountTransactions() {
        return new Promise(resolve => {
            this.db.list('transactions', {
                query: {
                    orderByChild: 'dateRegistered',
                    startAt: DateService.getInitialCurrentDate(),
                    endAt: DateService.getEndCurrentDate()
                }
            }).subscribe((snapshot: Transaction[]) => {
                for (let item in snapshot) {
                    if (snapshot[item].userKey == Globals.userInfo.username && snapshot[item].type == TRANSACTIONTYPE.INITIALCASH) {
                        resolve(snapshot[item].cash);
                    }
                }
            });
        })
    }
}
