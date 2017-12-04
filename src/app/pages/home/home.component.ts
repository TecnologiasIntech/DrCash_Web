
import {InitialCashComponent} from "../../modals/initial-cash/initial-cash.component";
import {Globals} from "../../statics/globals";
import {LoginComponent} from "../../modals/login/login.component";
import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {CashOutComponent} from "../../modals/cash-out/cash-out.component";
import {RefundComponent} from "../../modals/refund/refund.component";
import {SignUpComponent} from "../../modals/sign-up/sign-up.component";
import {CloseDateComponent} from "../../modals/close-date/close-date.component";
import {window} from "rxjs/operator/window";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }

    openCashIn() {
        this._modalService.open(CashInComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openCashOut() {
        this._modalService.open(CashOutComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openRefund() {
        this._modalService.open(RefundComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openSignUp() {
        this._modalService.open(SignUpComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openCloseDate() {
        this._modalService.open(CloseDateComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }
}
