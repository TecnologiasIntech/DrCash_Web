import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../interfaces/transaction";
import {isUndefined} from "util";
import {ValidationService} from "../../services/validation.service";
import {Globals} from "../../statics/globals";
import {TransactionService} from "../../services/transaction.service";
import {TRANSACTIONTYPE} from "../../enums/enums";
import {DateService} from "../../services/date.service";
import {alertService} from "../../services/alert.service";
import {LogService} from "../../services/log.service";
import {SettingService} from "../../services/setting.service";
import {ClinicInfo} from "../../interfaces/clinic-info";

@Component({
    selector: 'app-cash-in',
    templateUrl: './cash-in.component.html',
    styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent implements OnInit {

    constructor(private _activeModal: NgbActiveModal,
                private _transactionService: TransactionService,
                private _alertService: alertService,
                private _logService: LogService,
                private _settingsService: SettingService) {
    }

    @ViewChild('otherComment')
    otherComment: ElementRef;
    @ViewChild('amountCharged')
    amountCharged: ElementRef;
    @ViewChild('cashInput')
    cashInput: ElementRef;
    @ViewChild('patientName')
    patientName: ElementRef;
    @ViewChild('checkNumber')
    checkNumber: ElementRef;
    @ViewChild('copayment')
    copaymentInput: ElementRef;

    newTransaction: any = {} as Transaction;

    total: number = 0;
    amount: number = 0
    change: number = 0;
    cash: number;
    credit: number;
    check: number;

    transactionDateNumber: string;
    transactionDateLetter: string;
    transactionId: string;
    urlLogo: string = Globals.settings.logoUrl;

    transactionType: string;

    ngOnInit() {
        this.newTransaction = TransactionService.getDefaultValuesToTransaction();
    }


    savePrint() {
        if (this.isCashInTransactionReady()) {

            if (this.change < 0) {
                this._alertService.error('Lacks Money', '');
            } else {
                this.validateCashCreditCheckInputsArentNull();
                this.getTransactionDate();
                this.saveTransaction();
                this.saveTransactionType();
                this.setLog();
                this._settingsService.openRegister();
                this._settingsService.getClinicInfo()
                    .then((response: ClinicInfo) => {
                        this.printTicket(response);
                        this.showSuccessfulTransactionAlert();
                    });
            }
        } else {
            this.focusPaymentFirstNameInputs();
            this.focusCheckBoxs();
        }
    }

    verifyTypePayments() {
        debugger
        this.newTransaction.copayment = false;
        this.newTransaction.selfPay = false;
        this.newTransaction.labs = false;
        this.newTransaction.deductible = false;
        this.newTransaction.other = false;
        this.newTransaction.otherComments = "";

    }


    setLog() {
        let message: string = Globals.userInfo.username + " made a CashIn for $" + this.newTransaction.amountCharged + " in register " + Globals.userInfo.registerId;
        message += " with the transaction number " + this.newTransaction.dateRegistered + Globals.userInfo.userId;
        this._logService.setLog(message)
    }


    saveTransaction() {
        this.newTransaction.type = TRANSACTIONTYPE.CASHIN;
        this.parserFields();
        this._transactionService.setTransaction(this.newTransaction);
    }

    saveTransactionType() {
        this.transactionType = this.whatKindOfTransactionIs();
    }

    whatKindOfTransactionIs() {
        if (this.newTransaction.copayment) return "Copayment";
        if (this.newTransaction.selfPay) return "SelfPay";
        if (this.newTransaction.deductible) return "Deductible";
        if (this.newTransaction.labs) return "Labs";
        if (this.newTransaction.other) return this.newTransaction.otherComments;
    }

    parserFields() {
        if (!ValidationService.errorInField(this.newTransaction.cash)) {
            this.newTransaction.cash = parseFloat(this.newTransaction.cash.toString());
        }
        if (!ValidationService.errorInField(this.newTransaction.credit)) {
            this.newTransaction.credit = parseFloat(this.newTransaction.credit.toString());
        }
        if (!ValidationService.errorInField(this.newTransaction.check)) {
            this.newTransaction.check = parseFloat(this.newTransaction.check.toString());
        }
        if (!ValidationService.errorInField(this.newTransaction.amountCharged)) {
            this.newTransaction.amountCharged = parseFloat(this.newTransaction.amountCharged.toString());
        }
    }

    getTransactionDate() {
        this.transactionDateLetter = DateService.getDateLetter();
        this.transactionDateNumber = DateService.getDateNumber().toString();
        this.transactionId = DateService.getDateNumber().toString() + Globals.userInfo.userId.toString();

        this.newTransaction.dateRegistered = DateService.getDateNumber();
        this.newTransaction.modificationDate = DateService.getDateNumber();
        this.newTransaction.modificationDate = DateService.getDateNumber();
    }

    showSuccessfulTransactionAlert() {
        this._alertService.confirmSuccess("Successful Transaction", "")
            .then(() => {
                this._activeModal.close();
            });
    }

    focusPaymentFirstNameInputs() {
        if (ValidationService.errorInField(this.newTransaction.patientFirstName)) {
            this.patientName.nativeElement.focus();
        } else {
            if (ValidationService.errorInField(this.newTransaction.amountCharged)) {
                this.amountCharged.nativeElement.focus();
            } else {
                if (ValidationService.errorInField(this.newTransaction.cash) &&
                    ValidationService.errorInField(this.newTransaction.credit) &&
                    ValidationService.errorInField(this.newTransaction.check)) {
                    this.cashInput.nativeElement.focus();
                } else {
                    if (ValidationService.errorInField(this.newTransaction.checkNumber) && !ValidationService.errorInField(this.newTransaction.check)) {
                        this.checkNumber.nativeElement.focus();
                    }
                }

            }
        }

    }

    unfocusCheckbox() {
        if (!ValidationService.errorInField(this.newTransaction.copayment) ||
            !ValidationService.errorInField(this.newTransaction.selfPay) ||
            !ValidationService.errorInField(this.newTransaction.deductible) ||
            !ValidationService.errorInField(this.newTransaction.labs) ||
            !ValidationService.errorInField(this.newTransaction.other)) {

            this.copaymentInput.nativeElement.removeAttribute('style');
        }
    }

    focusCheckBoxs() {
        if (ValidationService.errorInField(this.newTransaction.copayment) &&
            ValidationService.errorInField(this.newTransaction.selfPay) &&
            ValidationService.errorInField(this.newTransaction.deductible) &&
            ValidationService.errorInField(this.newTransaction.labs) &&
            ValidationService.errorInField(this.newTransaction.other)) {
            this.copaymentInput.nativeElement.setAttribute('style', 'color: red')
        }
    }

    focusOtherComment() {
        if (this.newTransaction.other) {
            this.otherComment.nativeElement.removeAttribute('disabled');
            this.unfocusCheckbox();
            this.otherComment.nativeElement.focus();
        } else {
            this.otherComment.nativeElement.setAttribute('disabled', 'disabled');
        }
    }

    showTotalAmountChange() {
        this.calculateAmount();
        this.calculateTotal();
        this.calculateChange();
    }

    calculateAmount() {
        if (!ValidationService.errorInField(this.newTransaction.amountCharged)) {
            this.amount = parseFloat(this.newTransaction.amountCharged.toString());
        }
        else {
            this.amount = 0;
        }
    }

    calculateTotal() {
        this.validateCashCreditCheckInputsArentNull();
        this.total = parseFloat(this.cash.toString()) + parseFloat(this.credit.toString()) + parseFloat(this.check.toString());
    }

    calculateChange() {
        if (!ValidationService.errorInField(this.newTransaction.amountCharged)) {
            this.change = this.total - this.amount;
            this.newTransaction.change = this.change;
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
            !this.isPatientNameEmpty()) {
            return true;
        } else {
            this.focusPaymentFirstNameInputs();
            return false;
        }
    }

    closeModal() {
        this._activeModal.dismiss();
    }

    clearAllInputs() {
        this.newTransaction = {} as Transaction;
        this.total = 0.00;
        this.change = 0.00;
        this.amount = 0.00
    }

    isPatientNameEmpty() {
        return (ValidationService.errorInField(this.newTransaction.patientFirstName));
    }

    isCommentsInputEmpty() {
        return (ValidationService.errorInField(this.newTransaction.comment));
    }

    areBasicAmountInputsEmpty() {
        if (ValidationService.errorInField(this.newTransaction.amountCharged)) {
            return true;
        } else {
            if (!ValidationService.errorInField(this.newTransaction.cash) ||
                !ValidationService.errorInField(this.newTransaction.credit) ||
                !ValidationService.errorInField(this.newTransaction.check)) {
                if (!ValidationService.errorInField(this.newTransaction.check)) {
                    return (ValidationService.errorInField(this.newTransaction.checkNumber));
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }

    isAtLeastOneCheckBoxChecked() {
        return (!ValidationService.errorInField(this.newTransaction.copayment) ||
            !ValidationService.errorInField(this.newTransaction.selfPay) ||
            !ValidationService.errorInField(this.newTransaction.deductible) ||
            !ValidationService.errorInField(this.newTransaction.labs) ||
            !ValidationService.errorInField(this.newTransaction.other));
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

    restrictNumeric(e, field) {
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
            if (field.includes(".")) {
                return false;
            } else {
                return true;
            }
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }

    printTicket(clinicInfo: ClinicInfo) {
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
 <script>
</script>
 
 </head><body >`);
        // language=HTML
        mywindow.document.write(`

            <!--Ticker Header-->
            <div class="row">
                <div class="col-4 mt-1">
                    <img #logo src="${this.urlLogo}" width="100px" height="100px" alt="">
                </div>
                <div class="col-8">
                    Clinica La Familia
                    <br>
                    ${clinicInfo.address}
                    <br>
                    ${clinicInfo.stateAndCity}
                    <br>
                    ${clinicInfo.phone}
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
                    <td>${this.transactionType}</td>
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
                $("#barcode").JsBarcode("${this.transactionId}",{displayValue: true, fontSize: 20, width: 2, height: 50});
            })
            </script>
            
            <div style="text-align: center">
            <br>
            Printed By ${Globals.userInfo.username}
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
