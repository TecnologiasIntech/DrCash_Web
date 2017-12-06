import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {LoginComponent} from "../modals/login/login.component";
import {HomeComponent} from "../pages/home/home.component";
import {GeneralComponent} from "../pages/general/general.component";
import {DailyTransactionsComponent} from "../pages/daily-transactions/daily-transactions.component";
import {LogsComponent} from "../pages/logs/logs.component";
import {RegisterComponent} from "../pages/register/register.component";
import {SmtpComponent} from "../pages/smtp/smtp.component";
import {TransactionsComponent} from "../pages/transactions/transactions.component";
import {UserProfileComponent} from "../pages/user-profile/user-profile.component";
import {ClosedStatementsComponent} from "../pages/closed-statements/closed-statements.component";

const LAYOUT_ROUTES: Routes = [
    {
        path: '', component: LayoutComponent, children: [
        //Home
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'general', component: GeneralComponent},
        {path: 'dailyTransaction', component: DailyTransactionsComponent},
        {path: 'logs', component: LogsComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'smtp', component: SmtpComponent},
        {path: 'transactions', component: TransactionsComponent},
        {path: 'userProfile', component: UserProfileComponent},
        {path: 'closedStatements', component: ClosedStatementsComponent},
        {path: 'daily-transactions', component: DailyTransactionsComponent},
        {path: 'closed-statements', component: ClosedStatementsComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'general', component: GeneralComponent},
        {path: 'smtp', component: SmtpComponent}
    ]
    }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
