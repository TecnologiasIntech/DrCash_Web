import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {TransactionService} from "../../services/transaction.service";
import {ValidationService} from "../../services/validation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {Globals} from "../../statics/globals";

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    constructor(private _transactionService: TransactionService,
                private _modal:NgbModal) {
    }

    transactions: Transaction[] = [];
    transaction: Transaction = {} as Transaction;

    transactionNumber: number;
    dateFrom: any;
    dateTo: any;

    ngOnInit() {
    }

    searchTransactions() {
        this.validateDateFields();
        this._transactionService.searchDailyTransactions(this.transactionNumber, null, null, this.dateFrom, this.dateTo)
            .then((response: Transaction[]) => {
                this.transactions = response;
            })
    }

    validateDateFields() {
        if (!ValidationService.errorInField(this.dateFrom)) this.dateFrom = parseInt(this.dateFrom);
        if (!ValidationService.errorInField(this.dateTo)) this.dateTo = parseInt(this.dateTo);
    }

    showTransaction(transaction:Transaction) {
        this.transaction = transaction;
    }

    cleanFields(){
        this.transactionNumber = null;
        this.dateFrom = null;
        this.dateTo = null;

        this.transaction = {} as Transaction;
        this.transactions = [];
    }

    openEditTransaction(){
        this._modal.open(CashInComponent, Globals.optionModalLg);
    }

}
