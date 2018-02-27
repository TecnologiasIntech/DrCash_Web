import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {BILLS} from "../../enums/enums";
import {BrowserModule} from '@angular/platform-browser'
import {TransactionService} from "../../services/transaction.service";
import {ClosedTransaction} from "../../interfaces/closed-transaction";
import {DateService} from "../../services/date.service";
import {Globals} from "../../statics/globals";
import {PrintService} from "../../services/print.service";
import {LogService} from "../../services/log.service";
import {SettingService} from "../../services/setting.service";
import {alertService} from "../../services/alert.service";
import {ClinicInfo} from "../../interfaces/clinic-info";

@Component({
    selector: 'app-close-date',
    templateUrl: './close-date.component.html',
    styleUrls: ['./close-date.component.scss']
})
export class CloseDateComponent implements OnInit {

    Bills100: number = 0;
    Bills50: number = 0;
    Bills20: number = 0;
    Bills10: number = 0;
    Bills5: number = 0;
    Bills1: number = 0;
    totalCash: number = 0;
    totalCredit: string;
    totalCheck: string;
    leftRegisterLabel: string;
    totalEntered: number = 0;
    totalRegistered: number = 0;
    BILLS: any = BILLS;
    isErrorTotalCash = false;
    isErrorLeftInRegister = false;

    // Element Ref
    @ViewChild('bills100') bills100: ElementRef;
    @ViewChild('bills50') bills50: ElementRef;
    @ViewChild('bills20') bills20: ElementRef;
    @ViewChild('bills10') bills10: ElementRef;
    @ViewChild('bills5') bills5: ElementRef;
    @ViewChild('bills1') bills1: ElementRef;
    @ViewChild('credit') creditRef: ElementRef;
    @ViewChild('check') checkRef: ElementRef;
    @ViewChild('leftRegisterRef') leftRegisterRef: ElementRef;

    @Input() balance;

    constructor(private _activeModal: NgbActiveModal,
                public _validationService: ValidationService,
                private _transactionService: TransactionService,
                private _logService: LogService,
                private _settingsService: SettingService,
                private _alertSerivce:alertService) {
        debugger
    }

    ngOnInit() {
        this._transactionService.getMyCurrentTransactions()
            .then(response => {
                this.totalRegistered = this._transactionService.getTotalRegistered()
            });
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
        this.calculateTotalEntered();
    }

    decrementBills(bills: number, typeBills: number) {
        switch (typeBills) {
            case BILLS.BILLS100:
                if (this.Bills100 > 0) {
                    this.Bills100--;
                }
                break;
            case BILLS.BILLS50:
                if (this.Bills50 > 0) {
                    this.Bills50--;
                }
                break;
            case BILLS.BILLS20:
                if (this.Bills20 > 0) {
                    this.Bills20--;
                }
                break;
            case BILLS.BILLS10:
                if (this.Bills10 > 0) {
                    this.Bills10--;
                }
                break;
            case BILLS.BILLS5:
                if (this.Bills5 > 0) {
                    this.Bills5--;
                }
                break;
            case BILLS.BILLS1:
                if (this.Bills1 > 0) {
                    this.Bills1--;
                }
                break;
            default:
                break;
        }
        this.calculateTotalCash();
        this.calculateTotalEntered();
    }

    calculateTotalCash() {
        this.totalCash = (this.Bills100 * 100) + (this.Bills50 * 50) + (this.Bills20 * 20)
            + (this.Bills10 * 10) + (this.Bills5 * 5) + (this.Bills1 * 1);
    }

    calculateTotalEntered() {
        let credit: number = 0;
        let check: number = 0;
        let leftInRegistered: number = 0;
        // debugger
        if (!ValidationService.errorInField(this.totalCredit)) {
            credit = parseFloat(this.totalCredit);
        }
        if (!ValidationService.errorInField(this.totalCheck)) {
            check = parseFloat(this.totalCheck);
        }
        if (!ValidationService.errorInField(this.leftRegisterLabel)) {
            leftInRegistered = parseFloat(this.leftRegisterLabel);
        }

        this.totalEntered = this.totalCash + credit + check + leftInRegistered;
    }

    cleanFields() {
        this.Bills100 = 0;
        this.Bills50 = 0;
        this.Bills20 = 0;
        this.Bills10 = 0;
        this.Bills5 = 0;
        this.Bills1 = 0;
        this.totalCash = 0;
        this.totalCredit = null;
        this.totalCheck = null;
        this.leftRegisterLabel = null;
        this.totalEntered = 0;
    }

    closeModal() {
        this._alertSerivce.getReason("Write the reason why you cancel")
            .then((response:string)=>{
                this.setReasonLog(response);
                this._activeModal.close();
            })
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

    selectAllTextCredit() {
        this.creditRef.nativeElement.select();
    }

    selectAllTextCheck() {
        this.checkRef.nativeElement.select();
    }

    selectAllTextLeft() {
        this.leftRegisterRef.nativeElement.select();
    }

    setClosedTransaction() {
        //TODO: Preguntar si es necesario el balance
        this.validateInputs()
        let closedTransaction: ClosedTransaction = {
            bills_100: this.Bills100,
            bills_50: this.Bills50,
            bills_20: this.Bills20,
            bills_10: this.Bills10,
            bills_5: this.Bills5,
            bills_1: this.Bills1,
            checks_amount: parseFloat(this.totalCheck),
            credits_amount: parseFloat(this.totalCredit),
            total_charged: this.totalRegistered,
            total_cash: this.totalCash,
            total_check: parseFloat(this.totalCheck),
            total_credit: parseFloat(this.totalCredit),
            initial_cash: this._transactionService.initialCash,
            leftInRegister: parseFloat(this.leftRegisterLabel),
            balance: this.balance,
            transaction_count: this._transactionService.numberOfCurrentTransactions,
            reg_RegisterID: Globals.userInfo.registerId.toString(),
            username: Globals.userInfo.username,
            datetime: DateService.getCurrentDate()
        };

        this._transactionService.setClosedTransaction(closedTransaction);
        this.setLog();
        this._settingsService.openRegister();
        this._settingsService.getClinicInfo()
            .then((response:ClinicInfo)=> {
                PrintService.printClosedTransaction(closedTransaction, response);
            });
        this._activeModal.close();
    }

    validateInputs(){
        if(ValidationService.errorInField(this.totalCredit)){
           this.totalCredit = "0";
        }
        if(ValidationService.errorInField(this.totalCheck)){
            this.totalCheck = "0";
        }
        if(ValidationService.errorInField(this.leftRegisterLabel)){
            this.leftRegisterLabel = "0";
        }
    }

    setLog(){
        let message:string = Globals.userInfo.username+" closed date at te register "+ Globals.userInfo.registerId;
         message += " for $"+this.totalCash;
        this._logService.setLog(message)
    }

    setReasonLog(reason:string){
        let message:string = Globals.userInfo.username+" cancel a close date for reason: "+ reason;
        this._logService.setLog(message)
    }

    verifyFields() {
        if (this.totalCash == 0) {
            this.bills100.nativeElement.focus()
            this.isErrorTotalCash = true;
            this.selectAllText(BILLS.BILLS100);
        }else if(this.totalEntered < this.totalRegistered){
            this._alertSerivce.error('Lacks Money', '');
        } else if (Globals.settings.leaveMoneyInRegister){
            if(ValidationService.errorInField(this.leftRegisterLabel)) {
                this.leftRegisterRef.nativeElement.focus();
                this.isErrorLeftInRegister = true;
            }else{
                this.setClosedTransaction();
            }
        } else {
            if (ValidationService.errorInField(this.totalCheck)) {
                this.totalCheck = "0";
            }
            if (ValidationService.errorInField(this.totalCredit)) {
                this.totalCredit = "0";
            }
            this.setClosedTransaction();
        }
    }

    cleanErrors() {
        this.isErrorTotalCash = false;
        this.isErrorLeftInRegister = false;
    }
}
