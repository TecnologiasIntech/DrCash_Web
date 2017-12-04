import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../interfaces/transaction";
import {isUndefined} from "util";
import {ValidationService} from "../../services/validation.service";

@Component({
    selector: 'app-cash-in',
    templateUrl: './cash-in.component.html',
    styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent implements OnInit {

    constructor(private _activeModal: NgbActiveModal) {
    }

    newTransaction: Transaction = {} as Transaction;

    total : number = 0;

    change: number = 0;

    ngOnInit() {
    }

    calculateTotal(cash: number, credit: number, check:number){
        this.total = parseInt(cash.toString()) + parseInt(credit.toString()) + parseInt(check.toString())
        this.calculateChange();
    }

    calculateChange(){
        if(!ValidationService.errorInField(this.newTransaction.amountCharged)){
            this.change = this.total - this.newTransaction.amountCharged;
        }
    }

    areCashCreditCheckInputsEmpty(){
        let cash : number;
        let credit: number;
        let check: number;

        if(!ValidationService.errorInField(this.newTransaction.cash)){
            cash = this.newTransaction.cash
        }else{
            cash = 0;
        }
        if(!ValidationService.errorInField(this.newTransaction.credit)){
            credit = this.newTransaction.credit
        }else{
            credit = 0;
        }
        if(!ValidationService.errorInField(this.newTransaction.check)){
            check = this.newTransaction.check
        }else{
            check = 0;
        }

        this.calculateTotal(cash,credit,check);

    }

    validationsTest() {
        if (!this.areBasicAmountInputsEmpty() &&
            this.isAtLeastOneCheckBoxChecked() &&
            !this.isOtherCheckButOtherCommentsEmpty() &&
            !this.isPatientNameEMpty() &&
            !this.isCommentsInputEmpty()) {
            console.log("Campos Rellenos");
        } else {
            console.log("Campos Vacios");
        }
    }

    closeModal() {
        this._activeModal.close();
    }

    clearAllInputs() {
        this.newTransaction = {} as Transaction;
        this.total = 0;
        this.change = 0;
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
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }

    printTicket(){

    }
}
