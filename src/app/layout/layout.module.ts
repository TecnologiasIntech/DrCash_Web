///<reference path="../modals/sign-up/sign-up.component.ts"/>
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {LayoutRouting} from "./layout.routing";
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {ButtonsModule, Ng2BootstrapModule} from 'ngx-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LayoutComponent} from "./layout.component";
import {HeaderComponent} from './header/header.component';
import {SearchComponent} from './header/search/search.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NavigationTriggerComponent} from './header/navigation-trigger/navigation-trigger.component';
import {alertService} from "../services/alert.service";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase} from "angularfire2/database";
import {HomeComponent} from "../pages/home/home.component";
import {TransactionService} from "../services/transaction.service";
import {LogService} from "../services/log.service";
import {ReportService} from "../services/report.service";
import {UserService} from "../services/user.service";
import {CashInComponent} from "../modals/cash-in/cash-in.component";
import {CashOutComponent} from "../modals/cash-out/cash-out.component";
import {AuthorizationComponent} from "../modals/authorization/authorization.component";
import {RefundComponent} from "../modals/refund/refund.component";
import {CredentialsComponent} from "../modals/credentials/credentials.component";
import {CloseDateComponent} from "../modals/close-date/close-date.component";
import {DailyTransactionsComponent} from "../pages/daily-transactions/daily-transactions.component";
import {LogsComponent} from "../pages/logs/logs.component";
import {TransactionsComponent} from "../pages/transactions/transactions.component";
import {UpdateTransactionComponent} from "../modals/update-transaction/update-transaction.component";
import {ClosedStatementsComponent} from "../pages/closed-statements/closed-statements.component";
import {UserProfileComponent} from "../pages/user-profile/user-profile.component";
import {ManageUsersComponent} from "../modals/manage-users/manage-users.component";
import {RegisterComponent} from "../pages/register/register.component";
import {NewRegisterComponent} from "../modals/new-register/new-register.component";
import {GeneralComponent} from "../pages/general/general.component";
import {SmtpComponent} from "../pages/smtp/smtp.component";
import {SignUpComponent} from "../modals/sign-up/sign-up.component";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "../modals/login/login.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../services/validation.service";
import {InitialCashComponent} from "../modals/initial-cash/initial-cash.component";
import {Globals} from "../statics/globals";
import {DateService} from "../services/date.service";
import {ResetUserComponent} from "../modals/reset-user/reset-user.component";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
}

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SearchComponent,
        NavigationComponent,
        NavigationTriggerComponent,
        HomeComponent,
        CashInComponent,
        CashOutComponent,
        AuthorizationComponent,
        RefundComponent,
        CredentialsComponent,
        CloseDateComponent,
        DailyTransactionsComponent,
        LogsComponent,
        TransactionsComponent,
        ClosedStatementsComponent,
        UserProfileComponent,
        ManageUsersComponent,
        RegisterComponent,
        NewRegisterComponent,
        GeneralComponent,
        SmtpComponent,
        SignUpComponent,
        LoginComponent,
        InitialCashComponent,
        UpdateTransactionComponent,
        ResetUserComponent
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        AngularFireModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        SharedModule,
        NgbModule,
        NgbModule.forRoot(),
    ],
    providers: [
        alertService,
        AngularFireDatabase,
        TransactionService,
        LogService,
        ReportService,
        UserService,
        ValidationService,
        Globals,
        DateService

    ],
    entryComponents: [
        CashInComponent,
        CashOutComponent,
        CloseDateComponent,
        CredentialsComponent,
        LoginComponent,
        ManageUsersComponent,
        NewRegisterComponent,
        RefundComponent,
        SignUpComponent,
        AuthorizationComponent,
        InitialCashComponent,
        UpdateTransactionComponent,
        ResetUserComponent
    ]
})

export class LayoutModule {
}