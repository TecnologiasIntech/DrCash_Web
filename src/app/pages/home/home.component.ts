import {InitialCashComponent} from "../../modals/initial-cash/initial-cash.component";
import {Globals} from "../../statics/globals";
import {LoginComponent} from "../../modals/login/login.component";
import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {CashOutComponent} from "../../modals/cash-out/cash-out.component";
import {RefundComponent} from "../../modals/refund/refund.component";
import {SignUpComponent} from "../../modals/sign-up/sign-up.component";
import {CloseDateComponent} from "../../modals/close-date/close-date.component";
import {AuthorizationComponent} from "../../modals/authorization/authorization.component";
import {window} from "rxjs/operator/window";
import {AngularFireDatabase} from "angularfire2/database";
import {TransactionService} from "../../services/transaction.service";
import {FirebaseObjectFactoryOpts} from "angularfire2/database/interfaces";
import {DateService} from "../../services/date.service";
import {Credentials} from "crypto";
import {CredentialsComponent} from "../../modals/credentials/credentials.component";
import {TRANSACTIONTYPE, USERTYPE} from "../../enums/enums";
import {Transaction} from "../../interfaces/transaction";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentTransactions: Transaction[] = [];

    constructor(private _modal: NgbModal,
                private _globals: Globals,
                private db: AngularFireDatabase,
                public  _dateService: DateService,
                private  _transactionService: TransactionService) {
        _modal.open(LoginComponent, Globals.optionModalLg).result
            .then((response) => {
                _modal.open(InitialCashComponent, Globals.optionModalSm).result
                    .then(() => {
                        this.loadTransactions();
                    })
            })
    }

    ngOnInit() {
    }

    openCashIn() {
        this._modal.open(CashInComponent, Globals.optionModalLg);
    }

    openCashOut() {
        this._modal.open(CashOutComponent, Globals.optionModalLg);
    }

    openRefund() {
        this._modal.open(AuthorizationComponent, Globals.optionModalLg).result.then((result) => {
            if (result) {
                this._modal.open(RefundComponent, Globals.optionModalLg);
            }
        })
    }

    openCredentials() {
        this._modal.open(CredentialsComponent, Globals.optionModalLg);
    }

    openCloseDate() {
        this._modal.open(CloseDateComponent, Globals.optionModalLg);
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
                logTransaction = "Refund for total amount: $" + transaction.amountCharged;
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
                });
        } else {
            this._transactionService.getCurrentTransactions().then((response: Transaction[]) => {
                this.currentTransactions = response;
            })
        }
    }
}
