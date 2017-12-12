import {CashOutComponent} from "../../modals/cash-out/cash-out.component";
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InitialCashComponent} from "../../modals/initial-cash/initial-cash.component";
import {Globals} from "../../statics/globals";
import {LoginComponent} from "../../modals/login/login.component";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {CloseDateComponent} from "../../modals/close-date/close-date.component";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private _modal: NgbModal,
                private _globals: Globals) {
        _modal.open(CloseDateComponent, Globals.optionModalLg);
    }

    ngOnInit() {

    }

    open(){
        this._modal.open(InitialCashComponent, Globals.optionModalLg)
    }

    openC(){
        this._modal.open(CloseDateComponent, Globals.optionModalLg)
    }
}
