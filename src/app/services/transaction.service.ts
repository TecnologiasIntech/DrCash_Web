import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Transaction} from "../interfaces/transaction";
import {Observable} from "rxjs/Observable";
import {userInfo} from "os";
import {Globals} from "../statics/globals";
import {DateService} from "./date.service";
import {_catch} from "rxjs/operator/catch";

@Injectable()
export class TransactionService {

    transactionsRef: FirebaseListObservable<Transaction[]>;

    constructor(private db: AngularFireDatabase) {
        this.transactionsRef = this.db.list('transactions/');
    }

    getTransaction(key: number) {
        return this.db.object('transactions/' + key)
    }

    getAllTransactions() {
        return this.db.list('transactions')
    }

    getTransactionsByRange(startAt: number, endAt) {
        //TODO verificar esta consulta
        // return this.db.list('transactions', ref => ref
        //     .orderByChild('date')
        //     .startAt(startAt)
        //     .end(endAt))
    }

    setTransaction(transaction: Transaction) {
        this.transactionsRef.set(transaction.dateRegistered.toString()+Globals.userInfo.userId.toString(),transaction);
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
}
