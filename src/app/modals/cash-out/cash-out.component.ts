import {Component, OnInit} from '@angular/core';
import {isUndefined} from "util";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {BILLS} from "../../enums/enums";

@Component({
    selector: 'app-cash-out',
    templateUrl: './cash-out.component.html',
    styleUrls: ['./cash-out.component.scss']
})
export class CashOutComponent implements OnInit {

    comment:string;
    Bills100: number = 0;
    Bills50: number = 0;
    Bills20: number = 0;
    Bills10: number = 0;
    Bills5: number = 0;
    Bills1: number = 0;
    totalCash: number = 0;
    BILLS: any = BILLS;

    constructor(private _activeModal: NgbActiveModal,
                public _validationService: ValidationService) {
    }

    ngOnInit() {
    }


    incrementBills(bills: number, typeBills: number) {
        switch (typeBills) {
            case BILLS.BILLS100:
                this.Bills100++;
                break;
            case BILLS.BILLS50:
                this.Bills50++;
                break;
            case BILLS.BILLS20:
                this.Bills20++;
                break;
            case BILLS.BILLS10:
                this.Bills10++;
                break;
            case BILLS.BILLS5:
                this.Bills5++;
                break;
            case BILLS.BILLS1:
                this.Bills1++;
                break;
            default:
                break;
        }
        this.calculateTotalCash();
    }

    decrementBills(bills: number, typeBills: number) {
        switch (typeBills) {
            case BILLS.BILLS100:
                if(this.Bills100>0){
                    this.Bills100 --;
                }
                break;
            case BILLS.BILLS50:
                if(this.Bills50>0){
                    this.Bills50 --;
                }
                break;
            case BILLS.BILLS20:
                if(this.Bills20>0){
                    this.Bills20 --;
                }
                break;
            case BILLS.BILLS10:
                if(this.Bills10>0){
                    this.Bills10 --;
                }
                break;
            case BILLS.BILLS5:
                if(this.Bills5>0){
                    this.Bills5 --;
                }
                break;
            case BILLS.BILLS1:
                if(this.Bills1>0){
                    this.Bills1 --;
                }
                break;
            default:
                break;
        }
        this.calculateTotalCash();

    }

    calculateTotalCash() {
        this.totalCash = (this.Bills100 * 100) + (this.Bills50 * 50) + (this.Bills20 * 20)
            + (this.Bills10 * 10) + (this.Bills5 * 5) + (this.Bills1*1);
    }

    cleanFields() {
        this.Bills100 = 0;
        this.Bills50 = 0;
        this.Bills20 = 0;
        this.Bills10 = 0;
        this.Bills5 = 0;
        this.Bills1 = 0;
        this.totalCash = 0;
        this.comment=null;
    }

    closeModal() {
        this._activeModal.dismiss()
    }

}
