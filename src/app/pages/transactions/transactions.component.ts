import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {TransactionService} from "../../services/transaction.service";

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    constructor(private _transactionService: TransactionService) {
    }

    transactions: Transaction[] = [];

    transactionNumber: number;
    dateFrom: string;
    dateTo: string;


    ngOnInit() {
    }

    searchTransactions() {
        this._transactionService.searchDailyTransactions(this.transactionNumber, null, null, parseInt(this.dateFrom), parseInt(this.dateTo))
            .then((response: Transaction[]) => {
                this.transactions = response;
            })
    }

}
