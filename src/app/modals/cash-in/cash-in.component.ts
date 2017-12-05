import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../interfaces/transaction";
import {isUndefined} from "util";
import {ValidationService} from "../../services/validation.service";
import {Globals} from "../../statics/globals";

@Component({
    selector: 'app-cash-in',
    templateUrl: './cash-in.component.html',
    styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent implements OnInit {

    constructor(private _activeModal: NgbActiveModal) {
    }

    newTransaction: Transaction = {} as Transaction;

    total: number = 0;
    amount: number = 0
    change: number = 0;
    cash: number;
    credit: number;
    check: number;

    transactionDate;
    transactionDateNumber: string;
    transactionDateLetter:  string;

    ngOnInit() {
    }


    savePrint() {
        if (this.isCashInTransactionReady()) {

            this.validateCashCreditCheckInputsArentNull();
            this.getTransactionDate()
            this.convertTransactionDateToLetter();
            this.convertTransactionDateToNumber();
            this.printTicket();
        } else {
            console.log("La transaccion aun no esta lista para finalizarse");
        }
    }

    saveTransaction(){

    }

    getTransactionDate(){
        var date = new Date();
        this.transactionDate = date;
    }

    convertTransactionDateToLetter(){
        this.transactionDateLetter = this.transactionDate.toDateString()+" ";
        this.transactionDateLetter += this.transactionDate.getHours().toString()+":";
        this.transactionDateLetter += this.transactionDate.getMinutes().toString()+":";
        this.transactionDateLetter += this.transactionDate.getSeconds().toString();
    }

    convertTransactionDateToNumber(){
        this.transactionDateNumber =  this.transactionDate.getFullYear().toString();
        console.log(this.transactionDateNumber);
        this.transactionDateNumber += this.transactionDate.getMonth().toString();
        console.log(this.transactionDateNumber);
        this.transactionDateNumber += this.transactionDate.getDay().toString();
        console.log(this.transactionDateNumber);
        this.transactionDateNumber += this.transactionDate.getHours().toString();
        this.transactionDateNumber += this.transactionDate.getMinutes().toString();
        this.transactionDateNumber += this.transactionDate.getSeconds().toString();
    }

    showTotalAmountChange(){
        this.calculateAmount();
        this.calculateTotal();
        this.calculateChange();
    }

    calculateAmount(){
        if (!ValidationService.errorInField(this.newTransaction.amountCharged)) {
            this.amount = parseInt(this.newTransaction.amountCharged.toString());
        }
        else{
            this.amount = 0;
        }
    }
    calculateTotal() {
        this.validateCashCreditCheckInputsArentNull();
        this.total = parseInt(this.cash.toString()) + parseInt(this.credit.toString()) + parseInt(this.check.toString());
    }

    calculateChange() {
        if (!ValidationService.errorInField(this.newTransaction.amountCharged)) {
            this.change = this.total - this.newTransaction.amountCharged;
        }
    }

    validateCashCreditCheckInputsArentNull() {


        if (!ValidationService.errorInField(this.newTransaction.cash)) {
            this.cash = this.newTransaction.cash
        } else {
            this.cash = 0;
        }
        if (!ValidationService.errorInField(this.newTransaction.credit)) {
            this.credit = this.newTransaction.credit
        } else {
            this.credit = 0;
        }
        if (!ValidationService.errorInField(this.newTransaction.check)) {
            this.check = this.newTransaction.check
        } else {
            this.check = 0;
        }

    }

    isCashInTransactionReady() {
        if (!this.areBasicAmountInputsEmpty() &&
            this.isAtLeastOneCheckBoxChecked() &&
            !this.isOtherCheckButOtherCommentsEmpty() &&
            !this.isPatientNameEMpty() &&
            !this.isCommentsInputEmpty()) {
            console.log("Campos Rellenos");
            return true;
        } else {
            console.log("Campos Vacios");
            return false;
        }
    }

    closeModal() {
        this._activeModal.close();
    }

    clearAllInputs() {
        this.newTransaction = {} as Transaction;
        this.total = 0.00;
        this.change = 0.00;
        this.amount = 0.00
    }

    isPatientNameEMpty() {
        if (ValidationService.errorInField(this.newTransaction.patientFirstName)) {
            return true;
        } else {
            return false;
        }
    }

    isCommentsInputEmpty() {
        if (ValidationService.errorInField(this.newTransaction.comment)) {
            return true;
        } else {
            return false;
        }
    }

    areBasicAmountInputsEmpty() {
        if (ValidationService.errorInField(this.newTransaction.amountCharged)) {
            return true;
        } else {
            if (!ValidationService.errorInField(this.newTransaction.cash) ||
                !ValidationService.errorInField(this.newTransaction.credit) ||
                !ValidationService.errorInField(this.newTransaction.check)) {
                if (!ValidationService.errorInField(this.newTransaction.check)) {
                    if (!ValidationService.errorInField(this.newTransaction.checkNumber)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }

            } else {
                return true;
            }
        }
    }

    isAtLeastOneCheckBoxChecked() {
        if (!ValidationService.errorInField(this.newTransaction.copayment) ||
            !ValidationService.errorInField(this.newTransaction.selfPay) ||
            !ValidationService.errorInField(this.newTransaction.deductible) ||
            !ValidationService.errorInField(this.newTransaction.labs) ||
            !ValidationService.errorInField(this.newTransaction.other)) {
            return true;
        } else {
            return false;
        }
    }

    isOtherCheckButOtherCommentsEmpty() {
        if (ValidationService.errorInField(this.newTransaction.other)) {
            return false;
        } else {
            if (ValidationService.errorInField(this.newTransaction.otherComments)) {
                return true;
            } else {
                return false;
            }
        }
    }

    restrictNumeric(e) {
        let input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which === 45) {
            return false;
        }
        if (e.which === 46) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }


    printTicket() {
        let mywindow = window.open('', 'PRINT', 'height=650,width=300');

        mywindow.document.write('<html><head>');
        mywindow.document.write(` 
 <style>
 body {
    overflow:hidden;
}
</style>
 
 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.8.0/JsBarcode.all.js"></script>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
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
                    <th>$${this.newTransaction.amountCharged}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td>Payment</td>
                </tr>
                <tr>
                    <td>Total Cash</td>
                    <td>$${this.cash}</td>
                </tr>
                <tr>
                    <td>Credit Card</td>
                    <td>$${this.credit}</td>
                </tr>
                <tr>
                    <td>Check</td>
                    <td>$${this.check}</td>
                </tr>
                </tbody>
            </table>

            <!--Total And Change Table-->
            <table class="table table-sm">
                <thead class="thead-dark">
                <tr>
                    <th>Total Paid</th>
                    <th>$${this.total}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Change</td>
                    <td>$${this.change}</td>
                </tr>
                </tbody>
            </table>
            
            <canvas id="barcode"></canvas>
            
            <script>
            $(document).ready(function(){
                $("#barcode").JsBarcode("${this.transactionDateNumber}",{displayValue: true, fontSize: 20, width: 2});
            })
            </script>
            
            <div style="text-align: center">
            <br>
            Printed By David
            <br>
            ${this.transactionDateLetter}
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
