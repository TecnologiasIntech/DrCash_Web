import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../interfaces/transaction";
import {TransactionService} from "../../services/transaction.service";
import {ValidationService} from "../../services/validation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {Globals} from "../../statics/globals";
import * as firebase from "firebase";
import UpdateData = firebase.firestore.UpdateData;
import {UpdateTransactionComponent} from "../../modals/update-transaction/update-transaction.component";
import {DateService} from "../../services/date.service";

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

    constructor(private _transactionService: TransactionService,
                private _modal:NgbModal,
                public _dateService: DateService) {
    }

    transactions: Transaction[] = [];
    transaction: Transaction = {} as Transaction;

    transactionNumber: number;
    dateFrom: any;
    dateTo: any;
    transactionType:string;

    ngOnInit() {
    }

    searchTransactions() {
        this.validateDateFields();
        this.transactions = [];
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
        const modal = this._modal.open(UpdateTransactionComponent, Globals.optionModalLg);
        modal.componentInstance.editTransaction = this.transaction;
    }

    saveTransactionType(){
        this.transactionType = this.whatKindOfTransactionIs();
    }

    whatKindOfTransactionIs(){
        if(this.transaction.copayment) return "Copayment";
        if(this.transaction.selfPay) return "SelfPay";
        if(this.transaction.deductible) return "Deductible";
        if(this.transaction.labs) return "Labs";
        if(this.transaction.other) return this.transaction.otherComments;
    }

    getDate(){
        return this._dateService.convertDateToDD_MM_YYYY_HH_MM(this.transaction.dateRegistered.toString());
    }

    validateCashCreditCheckInputsArentNull() {
        if (ValidationService.errorInField(this.transaction.cash)) {
            this.transaction.cash = 0;
        }
        if (ValidationService.errorInField(this.transaction.credit)) {
            this.transaction.credit = 0
        }
        if (ValidationService.errorInField(this.transaction.check)) {
            this.transaction.check = 0;
        }
    }

    printTicket() {
        this.saveTransactionType();
        this.validateCashCreditCheckInputsArentNull();
        let mywindow = window.open('', 'PRINT', 'height=650,width=300');

        mywindow.document.write('<html><head>');
        mywindow.document.write(` 
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
 <style>
 body {
    overflow:hidden;
    -webkit-print-color-adjust: exact;
}
@media print{
  .oculto-impresion, .oculto-impresion *{
    display: none !important;
  }
  .thead-dark th {
        color: #fff !important;
        background-color: #292b2c !important;
    }
}
</style>
 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.8.0/JsBarcode.all.js"></script>
 
 </head><body >`);
        // language=HTML
        mywindow.document.write(`

            <!--Ticker Header-->
            <div class="row">
                <div class="col-4 mt-1">
                    <img src="https://image.ibb.co/jBf2eb/Clinica_La_Familia_Logo.png" alt="">
                </div>
                <div class="col-8">
                    Clinica La Familia
                    <br>
                    301 E Cottonwood Ln
                    <br>
                    Casa Grande AZ 85122
                    <br>
                    (602) 569-3999
                </div>
            </div>

            <!--Payment Table-->
            <table class="table table-sm">
                <thead class="thead-dark">
                <tr>
                    <th>Amount Charged</th>
                    <th>$${this.transaction.amountCharged}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>${this.transactionType}</td>
                </tr>
                <tr>
                    <td>Total Cash</td>
                    <td>$${this.transaction.cash}</td>
                </tr>
                <tr>
                    <td>Credit Card</td>
                    <td>$${this.transaction.credit}</td>
                </tr>
                <tr>
                    <td>Check</td>
                    <td>$${this.transaction.check}</td>
                </tr>
                </tbody>
            </table>

            <!--Total And Change Table-->
            <table class="table table-sm">
                <thead class="thead-dark">
                <tr>
                    <th>Total Paid</th>
                    <th>$${this.transaction.amountCharged}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Change</td>
                    <td>$${this.transaction.change}</td>
                </tr>
                </tbody>
            </table>
            
            <canvas id="barcode"></canvas>
            
            <script>
            $(document).ready(function(){
                $("#barcode").JsBarcode("${this.transaction.dateRegistered.toString() + this.transaction.modifiedById}",{displayValue: true, fontSize: 20, width: 2, height: 50});
            })
            </script>
            
            <div style="text-align: center">
            <br>
            Printed By ${Globals.userInfo.username}
            <br>
            ${this.getDate()}
            <br>


            <button class="oculto-impresion" onclick="imprimir()">Imprimir Ticket</button>
            </div>
            <script type="text/javascript">
                function imprimir() {
                    window.print();
                    window.close();
                }
            </script>
        `);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        // mywindow.print();
    }

}
