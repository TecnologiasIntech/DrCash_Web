import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { LayoutRouting } from "./layout.routing";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import {ButtonsModule, Ng2BootstrapModule} from 'ngx-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationTriggerComponent } from './header/navigation-trigger/navigation-trigger.component';
import {alertService} from "../services/alert.service";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabase} from "angularfire2/database";
import {HomeComponent} from "../pages/home/home.component";
import {TransactionService} from "../services/transaction.service";
import {LogService} from "../services/log.service";
import {ReportService} from "../services/report.service";
import {UserService} from "../services/user.service";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
}

@NgModule ({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SearchComponent,
        NavigationComponent,
        NavigationTriggerComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        LayoutRouting,
        FormsModule,
        AngularFireModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        ButtonsModule.forRoot(),
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    providers: [
        alertService,
        AngularFireDatabase,
        TransactionService,
        LogService,
        ReportService,
        UserService
    ]
})

export class LayoutModule {  }