
import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {TransactionService} from "../../services/transaction.service";
import {Observable} from "rxjs/Observable";
import {Transaction} from "../../interfaces/transaction";


@Component({
    selector: 'app-refund',
    templateUrl: './refund.component.html',
    styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

    enableLog: boolean = false;
    refound: string;
    transactionNumber: string;
    logComment: string;
    logComment2: string;
    cadena: string;
    contenido: Transaction;


    constructor(private _activeModal: NgbActiveModal,
                public _validationService: ValidationService,
                private _transactionService: TransactionService) {
    }

    ngOnInit() {
    }

    clearTransaction() {
        this.transactionNumber = null;
    }

    searchTransaction(numberTransaction: number) {
        this._transactionService.getTransaction(numberTransaction).subscribe((result: Transaction) => {
            this.contenido = result;
            // types of pay

            if (this.contenido.copayment) {
                this.cadena = "Copayment for a total of: ";
            } else {
                if (this.contenido.deductible) {
                    this.cadena="Deductible for a total of: ";
                } else {
                    if (this.contenido.selfPay) {
                        this.cadena="Selfpay for a total of: ";
                    } else {
                        if (this.contenido.labs) {
                            this.cadena="Labs for a total of: ";
                        } else {
                            // this.cadena=this.contenido.otherComments;
                            this.cadena=this.contenido.otherComments;
                        }
                    }
                }
            }
            this.logComment = this.cadena + "$" + this.contenido.amountCharged;
        })
    }

    updateTransaction(numberTransaction: string, ammount: number, comment: Transaction) {

        this._transactionService.updateTransaction(numberTransaction, ammount, comment);
        this._activeModal.dismiss();
    }

    closeRefund() {
        this._activeModal.dismiss();
    }



}
