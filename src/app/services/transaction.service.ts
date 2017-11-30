import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Transaction} from "../interfaces/transaction";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TransactionService {

    transactionsRef:FirebaseListObservable<Transaction[]>;

    constructor(private db: AngularFireDatabase) {
        this.transactionsRef = this.db.list('transactions');
    }

    getTransaction() {
        return this.db.list('')
    }

    getAllTransactions() {
        return this.db.list('transactions')
    }

    getTransactionsByRange(startAt:number, endAt) {
        //TODO verificar esta consulta
        return this.db.list('transactions', ref => ref
            .orderByChild('date')
            .startAt(startAt)
            .end(endAt))
    }

    setTransaction(transaction: Transaction) {
        this.transactionsRef.push(transaction);
    }

    updateTransaction(transactionKey: string, transaction: Transaction) {
        this.transactionsRef.update(transactionKey, transaction)
    }


}
