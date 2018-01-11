import {InitialCashComponent} from "../../modals/initial-cash/initial-cash.component";
import {Globals} from "../../statics/globals";
import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {CashOutComponent} from "../../modals/cash-out/cash-out.component";
import {RefundComponent} from "../../modals/refund/refund.component";
import {CloseDateComponent} from "../../modals/close-date/close-date.component";
import {AuthorizationComponent} from "../../modals/authorization/authorization.component";
import {AngularFireDatabase} from "angularfire2/database";
import {TransactionService} from "../../services/transaction.service";
import {DateService} from "../../services/date.service";
import {CredentialsComponent} from "../../modals/credentials/credentials.component";
import {TRANSACTIONTYPE, USERTYPE} from "../../enums/enums";
import {Transaction} from "../../interfaces/transaction";
import {ValidationService} from "../../services/validation.service";
import {ResetUserComponent} from "../../modals/reset-user/reset-user.component";
import {ActivatedRoute} from "@angular/router";
import {Broadcaster} from "../../../assets/js/broadcaster";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentTransactions: Transaction[] = [];
    showTransactions: boolean = false;
    totalsTransactions: any;

    constructor(private _modal: NgbModal,
                private _globals: Globals,
                private db: AngularFireDatabase,
                public  _dateService: DateService,
                private  _transactionService: TransactionService,
                private _broadcast:Broadcaster) {

        if (Globals.userInfo.passwordReset) {
            this.openResetUser();
        } else {
            this.loadTransactions();
        }
    }

    ngOnInit() {
        this.cleanTotalsTransactions();
        this.listenFlagToHideTransactions();
    }

    listenFlagToHideTransactions(){
        this._broadcast.on<boolean>('hideTransactions')
            .subscribe((response:boolean)=>{
                if(response){
                    this.currentTransactions = [];
                    this.cleanTotalsTransactions();
                }else{
                    this.loadTransactions();
                }
            });
    }

    openResetUser() {
        this._modal.open(ResetUserComponent, Globals.optionModalSm).result
            .then(() => {
                this.loadTransactions();
            })
    }

    openCashIn() {
        this._modal.open(CashInComponent, Globals.optionModalLg).result
            .then((result) => {
                this.loadTransactions();
            }, (reason) => {
            })
    }

    openCashOut() {
        this._modal.open(CashOutComponent, Globals.optionModalLg).result
            .then((result) => {
                this.loadTransactions();
            }, (reason) => {
            })
    }

    openRefund() {
        this._modal.open(AuthorizationComponent, Globals.optionModalLg).result.then((result) => {
            if (result) {
                this._modal.open(RefundComponent, Globals.optionModalLg).result
                    .then(response => {
                        this.loadTransactions();
                    }, (reason) => {
                    })
            }
        })
    }

    openCredentials() {
        this.currentTransactions = [];
        this.cleanTotalsTransactions();
        this._modal.open(CredentialsComponent, Globals.optionModalLg).result
            .then(response => {
                this.loadTransactions();
            }, (reason) => {
            })
    }

    openCloseDate() {
        this._modal.open(CloseDateComponent, Globals.optionModalLg).result
            .then(response => {
                this.loadTransactions();
            }, (reason) => {
            })
    }

    getLogTransaction(transaction: Transaction) {
        let logTransaction: string = "";

        switch (transaction.type) {
            case TRANSACTIONTYPE.CASHIN:
                if (transaction.copayment) {
                    logTransaction = "Copayment for total amount: $";
                } else if (transaction.deductible) {
                    logTransaction = "Deductible for total amount: $";
                } else if (transaction.selfPay) {
                    logTransaction = "Selfpay for total amount: $";
                } else if (transaction.labs) {
                    logTransaction = "Labs for total amount: $";
                } else {
                    logTransaction = transaction.otherComments;
                }

                logTransaction = logTransaction + (transaction.amountCharged - transaction.change);
                break;

            case TRANSACTIONTYPE.CASHOUT:
                logTransaction = "Cash Out for total amount: $" + transaction.cash;
                break;

            case TRANSACTIONTYPE.REFUND:
                logTransaction = "Refund for total amount: $" + transaction.cash;
                break;

            case TRANSACTIONTYPE.INITIALCASH:
                logTransaction = "Initial Cash for total amount: $" + transaction.cash;
                break;
        }
        return logTransaction;
    }

    loadTransactions() {
        if (Globals.userInfo.securityLevel == USERTYPE.USER) {
            this._transactionService.getMyCurrentTransactions()
                .then((response: Transaction[]) => {
                    this.currentTransactions = response;
                    this.calculateTotalsTransactions(response);
                    this.showTransactions = true;
                })
                .catch(() => {
                    this.openInitialCash();
                })
        } else {
            this._transactionService.getCurrentTransactions()
                .then((response: Transaction[]) => {
                    this.currentTransactions = response;
                    this.calculateTotalsTransactions(response);
                    this.showTransactions = true;
                })
                .catch(() => {
                    this.openInitialCash();
                })
        }
    }

    cleanTotalsTransactions() {
        this.totalsTransactions = {
            initialCash: 0,
            totalCashIn: 0,
            totalCredit: 0,
            totalCheck: 0,
            totalIn: 0,
            totalCashOut: 0,
            totalRefund: 0,
            totalOut: 0,
            Balance: 0
        };
    }

    openInitialCash() {
        this._modal.open(InitialCashComponent, Globals.optionModalSm).result
            .then(() => {
                this._transactionService.getMyCurrentTransactions()
                    .then((response: Transaction[]) => {
                        this.currentTransactions = response;
                        this.calculateTotalsTransactions(response);
                        this.showTransactions = true;
                    })
                    .catch(error => {
                        this.openInitialCash();
                    });
                this.showTransactions = true;
            })
    }

    calculateTotalsTransactions(currentTransactions: Transaction[]) {
        this.cleanTotalsTransactions();
        for (let item in currentTransactions) {
            switch (currentTransactions[item].type) {
                case TRANSACTIONTYPE.INITIALCASH:
                    this.totalsTransactions.initialCash = currentTransactions[item].cash;
                    break;

                case TRANSACTIONTYPE.CASHIN:
                    if (!ValidationService.errorInField(currentTransactions[item].cash)) {
                        this.totalsTransactions.totalCashIn += currentTransactions[item].cash;
                    }
                    if (!ValidationService.errorInField(currentTransactions[item].credit)) {
                        this.totalsTransactions.totalCredit += currentTransactions[item].credit;
                    }
                    if (!ValidationService.errorInField(currentTransactions[item].check)) {
                        this.totalsTransactions.totalCheck += currentTransactions[item].check;
                    }
                    break;

                case TRANSACTIONTYPE.CASHOUT:
                    if (!ValidationService.errorInField(currentTransactions[item].cash)) {
                        this.totalsTransactions.totalCashOut += currentTransactions[item].cash;
                    }
                    break;

                case TRANSACTIONTYPE.REFUND:
                    if (!ValidationService.errorInField(currentTransactions[item].cash)) {
                        this.totalsTransactions.totalRefund += currentTransactions[item].cash;
                    }
                    break;
            }
        }
        this.totalsTransactions.totalIn = this.totalsTransactions.totalCashIn + this.totalsTransactions.totalCredit + this.totalsTransactions.totalCheck;
        this.totalsTransactions.totalOut = this.totalsTransactions.totalCashOut + this.totalsTransactions.totalRefund;
        this.totalsTransactions.Balance = (this.totalsTransactions.totalIn + this.totalsTransactions.initialCash) - this.totalsTransactions.totalOut;
    }
}
