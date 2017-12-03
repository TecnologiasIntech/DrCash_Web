import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../interfaces/transaction";
import {isUndefined} from "util";

@Component({
    selector: 'app-cash-in',
    templateUrl: './cash-in.component.html',
    styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent implements OnInit {

    constructor(private _activeModal: NgbActiveModal) {
    }

    newTransaction: Transaction = {} as Transaction;


    ngOnInit() {
    }




    validationsTest() {
        if (!this.areBasicAmountInputsEmpty() && this.isAtLeastOneCheckBoxChecked() && !this.isOtherCheckButOtherCommentsEmpty()) {
            console.log("Campos Rellenos");
        } else {
            console.log("Campos Vacios");
        }
    }

    closeModal() {
        this._activeModal.close();
    }

    isUndefinedOrEmpty(field) {
        if (isUndefined(field)) {
            return true;
        } else {
            if (field.length == 0) {
                return true;
            } else {
                if (field != false) {
                    return false
                }
                else {
                    return true;
                }
            }
        }

    }

    areBasicAmountInputsEmpty() {
        if (this.isUndefinedOrEmpty(this.newTransaction.amountCharged)) {
            return true;
        } else {
            if (!this.isUndefinedOrEmpty(this.newTransaction.cash) ||
                !this.isUndefinedOrEmpty(this.newTransaction.credit) ||
                !this.isUndefinedOrEmpty(this.newTransaction.check)) {
                if (!this.isUndefinedOrEmpty(this.newTransaction.check)) {
                    if (!this.isUndefinedOrEmpty(this.newTransaction.checkNumber)) {
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
        if (!this.isUndefinedOrEmpty(this.newTransaction.copayment) ||
            !this.isUndefinedOrEmpty(this.newTransaction.selfPay) ||
            !this.isUndefinedOrEmpty(this.newTransaction.deductible) ||
            !this.isUndefinedOrEmpty(this.newTransaction.labs) ||
            !this.isUndefinedOrEmpty(this.newTransaction.other)) {
            return true;
        }else{
            return false;
        }
    }

    isOtherCheckButOtherCommentsEmpty(){
        if(this.isUndefinedOrEmpty(this.newTransaction.other)){
            return false;
        }else{
            if(this.isUndefinedOrEmpty(this.newTransaction.otherComments)){
                return true;
            }else{
                return false;
            }
        }
    }

}
