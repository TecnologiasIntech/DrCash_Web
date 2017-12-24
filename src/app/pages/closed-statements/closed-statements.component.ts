import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {ClosedTransaction} from "../../interfaces/closed-transaction";
import {DateService} from "../../services/date.service";
import {TransactionService} from "../../services/transaction.service";
import {ValidationService} from "../../services/validation.service";
import {PrintService} from "../../services/print.service";

@Component({
    selector: 'app-closed-statements',
    templateUrl: './closed-statements.component.html',
    styleUrls: ['./closed-statements.component.scss']
})
export class ClosedStatementsComponent implements OnInit {

    transactionNumber: number;
    dateTo: any;
    dateFrom: any;
    transactions: Transaction[];
    closedTransactions: ClosedTransaction[];
    closedTransaction: ClosedTransaction = {} as ClosedTransaction;

    constructor(public _dateService: DateService,
                private _transactionService: TransactionService) {
    }

    ngOnInit() {
    }

    cleanFields() {
        this.transactionNumber = null;
        this.dateFrom = null;
        this.dateTo = null;

        this.transactions = [];
        this.closedTransactions = [];
        this.closedTransaction = {} as ClosedTransaction;
    }

    searchClosedTransactions() {
        this.validateDateFields();
        this.transactions = [];
        this.closedTransactions = [];
        this.closedTransaction = {} as ClosedTransaction;
        this._transactionService.searchClosedTransactions(this.transactionNumber, this.dateFrom, this.dateTo)
            .then((response: ClosedTransaction[]) => {
                this.closedTransactions = response;
            })
    }

    validateDateFields() {
        if (!ValidationService.errorInField(this.dateFrom)) this.dateFrom = parseInt(this.dateFrom);
        if (!ValidationService.errorInField(this.dateTo)) this.dateTo = parseInt(this.dateTo);
    }

    showClosedTransaction(closedTransaction: ClosedTransaction) {
        this.closedTransaction = closedTransaction;
        let dateF: number, dateT: number;
        dateF = parseInt((this.closedTransaction.datetime.toString()).substr(0, 8) + "000000");
        dateT = parseInt((this.closedTransaction.datetime.toString()).substr(0, 8) + "235959");
        debugger;
        this._transactionService.searchDailyTransactions(null, null, null, dateF, dateT)
            .then((response: Transaction[]) => {
                this.transactions = response;
            })
    }

    printTransaction(){
        PrintService.printClosedTransaction(this.closedTransaction);
    }

}
