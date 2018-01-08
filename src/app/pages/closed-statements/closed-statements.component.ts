import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {ClosedTransaction} from "../../interfaces/closed-transaction";
import {DateService} from "../../services/date.service";
import {TransactionService} from "../../services/transaction.service";
import {ValidationService} from "../../services/validation.service";
import {PrintService} from "../../services/print.service";
import {LogService} from "../../services/log.service";
import {Globals} from "../../statics/globals";
import {SettingService} from "../../services/setting.service";
import {ClinicInfo} from "../../interfaces/clinic-info";

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
                private _transactionService: TransactionService,
                private _logService:LogService,
                private _settingsService:SettingService) {
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
        if (!ValidationService.errorInField(this.dateFrom)) {
            this.dateFrom = DateService.getInitialDateByDatePicker(this.dateFrom);
            this.dateFrom = parseInt(this.dateFrom);
        }
        if (!ValidationService.errorInField(this.dateTo)) {
            this.dateTo = DateService.getEndDateByDatePicker(this.dateTo);
            this.dateTo = parseInt(this.dateTo);
        }
    }

    showClosedTransaction(closedTransaction: ClosedTransaction) {
        this.closedTransaction = closedTransaction;
        let dateF: number, dateT: number;
        dateF = parseInt((this.closedTransaction.datetime.toString()).substr(0, 8) + "000000");
        dateT = parseInt((this.closedTransaction.datetime.toString()).substr(0, 8) + "235959");
        this._transactionService.searchDailyTransactions(null, null, null, dateF, dateT)
            .then((response: Transaction[]) => {
                this.transactions = response;
            })
    }

    printTransaction(){
        this._settingsService.getClinicInfo()
            .then((response:ClinicInfo)=>{
                PrintService.printClosedTransaction(this.closedTransaction, response);
                this.setLog()
            });

    }

    setLog(){
        let message:string = Globals.userInfo.username+" reprint closed statement for ID ";
        message += this.closedTransaction.datetime;
        this._logService.setLog(message)
    }

}
