import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {TransactionService} from "../../services/transaction.service";
import {ValidationService} from "../../services/validation.service";
import {TRANSACTIONTYPE} from "../../enums/enums";
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
@Component({
    selector: 'app-daily-transactions',
    templateUrl: './daily-transactions.component.html',
    styleUrls: ['./daily-transactions.component.scss']
})
export class DailyTransactionsComponent implements OnInit {

    transactions: Transaction[];
    patientName: string;
    comment: string;
    transactionNumber: number;
    dateFrom: any;
    dateTo: any;

    constructor(private _transactionService: TransactionService) {
        this.cleanFields()
    }

    ngOnInit() {
    }

    searchTransactions() {
        this.validateDateFields();
        this._transactionService.searchDailyTransactions(this.transactionNumber, this.comment, this.patientName, this.dateFrom, this.dateTo)
            .then((response: Transaction[]) => {
                this.transactions = response;
            })
    }

    validateDateFields() {
        if (!ValidationService.errorInField(this.dateFrom)) this.dateFrom = parseInt(this.dateFrom);
        if (!ValidationService.errorInField(this.dateTo)) this.dateTo = parseInt(this.dateTo);
    }

    cleanFields() {
        this.patientName = null;
        this.comment = null;
        this.transactionNumber = null;
        this.dateFrom = null;
        this.dateTo = null;
    }

    getTypeTransaction(type:number){
        switch (type){
            case TRANSACTIONTYPE.INITIALCASH:
                return 'Initial Cash';

            case TRANSACTIONTYPE.CASHIN:
                return 'Cash In';

            case TRANSACTIONTYPE.CASHOUT:
                return 'Cash Out';

            case TRANSACTIONTYPE.REFUND:
                return 'Refund';
        }
    }

    printTransactionsTable(){
        let columns: string[] = ["id","nombre"];
        let rows = this._transactionService.convertTransactionsToPrintPDF(this.transactions);
        let doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, rows);
        doc.save('table.pdf');
    }

}
