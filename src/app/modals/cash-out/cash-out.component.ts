import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {isUndefined} from "util";import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {BILLS, TRANSACTIONTYPE} from "../../enums/enums";
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../interfaces/transaction";
import {DateService} from "../../services/date.service";
import {alertService} from "../../services/alert.service";
import {PrintService} from "../../services/print.service";
import {LogService} from "../../services/log.service";
import {Globals} from "../../statics/globals";

@Component({
    selector: 'app-cash-out',
    templateUrl: './cash-out.component.html',
    styleUrls: ['./cash-out.component.scss']
})
export class CashOutComponent implements OnInit {
    transaction:Transaction;
    comment:string;
    Bills100: number = 0;
    Bills50: number = 0;
    Bills20: number = 0;
    Bills10: number = 0;
    Bills5: number = 0;
    Bills1: number = 0;
    totalCash: number = 0;
    BILLS: any = BILLS;

    @ViewChild('bills100') bills100: ElementRef;
    @ViewChild('bills50') bills50: ElementRef;
    @ViewChild('bills20') bills20: ElementRef;
    @ViewChild('bills10') bills10: ElementRef;
    @ViewChild('bills5') bills5: ElementRef;
    @ViewChild('bills1') bills1: ElementRef;

    constructor(private _activeModal: NgbActiveModal,
                public _validationService: ValidationService,
                private _transactionService:TransactionService,
                private _alertService:alertService,
                private _logService:LogService) {

        this.transaction=TransactionService.getDefaultValuesToTransaction()
    }

    ngOnInit() {
    }

    selectAllText(typeBills: number) {
        switch (typeBills) {
            case BILLS.BILLS100:
                this.bills100.nativeElement.select();
                break;
            case BILLS.BILLS50:
                this.bills50.nativeElement.select();
                break;
            case BILLS.BILLS20:
                this.bills20.nativeElement.select();
                break;
            case BILLS.BILLS10:
                this.bills10.nativeElement.select();
                break;
            case BILLS.BILLS5:
                this.bills5.nativeElement.select();
                break;
            case BILLS.BILLS1:
                this.bills1.nativeElement.select();
                break;
            default:
                break;
        }
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

    saveTransaction(){
        if(this.totalCash!=0 ){
            this.transaction.cash=this.totalCash;
            this.transaction.type=TRANSACTIONTYPE.CASHOUT;
            this.transaction.dateRegistered=DateService.getDateNumber();
            this.transaction.modificationDate=DateService.getDateNumber();
            this.transaction.cash = parseFloat(this.transaction.cash.toString());

            this._transactionService.setTransaction(this.transaction);
            this.setLog();
            PrintService.printCashOut(this.transaction);

            this._alertService.confirmSuccess("Successful Transaction","")
                .then(()=>{
                    this._activeModal.close();
                });
        }else{
            this._alertService.error("Failed Transaction","TotalCash Field Must Have a Value ")
        }
    }

    setLog(){
        //TODO Cambiar el numero de los register
        let message:string = Globals.userInfo.username+" made a CashOut for $"+this.transaction.cash+" in register 1";
        message += " with the transaction number "+this.transaction.dateRegistered+Globals.userInfo.userId;
        this._logService.setLog(message)
    }

}
