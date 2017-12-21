import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {TransactionService} from "../../services/transaction.service";
import {Observable} from "rxjs/Observable";
import {Transaction} from "../../interfaces/transaction";
import {DateService} from "../../services/date.service";
import {TRANSACTIONTYPE} from "../../enums/enums";


@Component({
    selector: 'app-refund',
    templateUrl: './refund.component.html',
    styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

    enableLog: boolean = false;
    refund: string;
    transactionNumber: string;
    logTransaction: string;
    refundComment: string;
    cadena: string;
    transaction: Transaction;
    refundTransaction: Transaction;

    constructor(private _activeModal: NgbActiveModal,
                public _validationService: ValidationService,
                private _transactionService: TransactionService) {
        this.refundTransaction = TransactionService.getDefaultValuesToTransaction();
    }

    ngOnInit() {
    }

    clearTransaction() {
        this.transactionNumber = null;
        this.transaction.amountCharged = null;
        this.logTransaction = null;
        this.refundComment = null;
        this.refund = null;
    }

    searchTransaction(numberTransaction: number) {
        this._transactionService.getTransaction(numberTransaction).subscribe((result: Transaction) => {
            this.transaction = result;
            if (this.transaction.copayment) {
                this.cadena = "Copayment for a total of: ";
            } else {
                if (this.transaction.deductible) {
                    this.cadena = "Deductible for a total of: ";
                } else {
                    if (this.transaction.selfPay) {
                        this.cadena = "Selfpay for a total of: ";
                    } else {
                        if (this.transaction.labs) {
                            this.cadena = "Labs for a total of: ";
                        } else {
                            this.cadena = this.transaction.otherComments;
                        }
                    }
                }
            }
            this.logTransaction = this.cadena + "$" + (this.transaction.amountCharged - this.transaction.change);
        })
    }

    updateTransaction(numberTransaction: string, ammount: number, comment: Transaction) {
        this._transactionService.updateTransaction(numberTransaction, ammount, comment);
        this._activeModal.dismiss();
    }

    setTransaction() {
        this.refundTransaction.dateRegistered = DateService.getCurrentDate();
        this.refundTransaction.cash = parseFloat(this.refund);
        this.refundTransaction.type = TRANSACTIONTYPE.REFUND;
        this.refundTransaction.modificationDate = DateService.getCurrentDate();
        if(!ValidationService.errorInField(this.refundComment)){
            this.refundTransaction.comment = this.refundComment;
        }

        this._transactionService.setTransaction(this.refundTransaction);
        this._activeModal.close();
    }


    closeRefund() {
        this._activeModal.dismiss();
    }


}
