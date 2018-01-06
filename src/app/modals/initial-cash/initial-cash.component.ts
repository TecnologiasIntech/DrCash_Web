import {Component, OnInit, ViewChild} from '@angular/core';
import {ValidationService} from "../../services/validation.service";
import {isUndefined} from "util";
import {init} from "protractor/built/launcher";
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../interfaces/transaction";
import {TRANSACTIONTYPE} from "../../enums/enums";
import {DateService} from "../../services/date.service";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Globals} from "../../statics/globals";
import {LogService} from "../../services/log.service";
import {SettingService} from "../../services/setting.service";
import {alertService} from "../../services/alert.service";

@Component({
    selector: 'app-initial-cash',
    templateUrl: './initial-cash.component.html',
    styleUrls: ['./initial-cash.component.scss']
})
export class InitialCashComponent implements OnInit {

    errorInitialCash: boolean = false;
    transaction: any = TransactionService.getDefaultValuesToTransaction();
    @ViewChild('cash')
    cash: any;
    initialDate: number;
    endDate: number;

    constructor(private _transactionsService: TransactionService,
                private _activeModal: NgbActiveModal,
                public _validationService: ValidationService,
                private _logService: LogService,
                private _settingsService: SettingService,
                private _alertService: alertService) {
        this.initialDate = DateService.getInitialCurrentDate();
        this.endDate = DateService.getEndCurrentDate();
    }

    ngOnInit() {
    }

    setInitialCash(initialCash: string) {
        debugger
        if (!ValidationService.errorInField(initialCash)) {
            this.transaction.dateRegistered = DateService.getDateNumber();
            this.transaction.type = TRANSACTIONTYPE.INITIALCASH;
            this.transaction.cash = parseFloat(initialCash);
            this._transactionsService.setTransaction(this.transaction);
            this._settingsService.openRegister();
            this.setLog();
            this._activeModal.close();
        } else {
            this.errorInitialCash = true;
            this.cash.nativeElement.focus();
        }
    }

    selectAllText() {
        this.cash.nativeElement.select();
    }

    setLog() {
        let message: string = Globals.userInfo.username + " made a Initial Cash for $" + this.transaction.cash;
        message += " in register "+ Globals.userInfo.registerId;
        this._logService.setLog(message);
    }

    verifyLeftInRegister(initialCash: string, initiaDate: number, endDate: number) {
        this._transactionsService.getLeftInRegister(parseInt(initialCash), initiaDate, endDate)
            .then((response: number) => {
                if (parseInt(initialCash) == response) {
                    this.setInitialCash(initialCash);
                } else {
                    let message: string;
                        message = "There is a difference of " + (parseInt(initialCash) - response) + " dollars in the amounts. Do you want to accept the difference?";

                    this._alertService.confirmOrCancel("Warning", message)
                        .then(() => {
                            this.setInitialCash(initialCash);
                        })
                        .catch(() => {
                        });
                }
            })
            .catch(() => {
                let date = DateService.removeOneDayToDate(initiaDate.toString());
                let fromDate = date + "000000";
                let toDate = date + "235959";

                this.verifyLeftInRegister(initialCash, parseInt(fromDate), parseInt(toDate))
            })
    }
}
