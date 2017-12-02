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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

    openCashIn() {
        this.modalService.open(CashInComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openCashOut() {
        this.modalService.open(CashOutComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openRefund() {
        this.modalService.open(RefundComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openSignUp() {
        this.modalService.open(SignUpComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

    openCloseDate() {
        this.modalService.open(CloseDateComponent, {backdrop: 'static', keyboard: false, size: "lg"});
    }

  //   open(){
  //     window.document.write("<p>This is 'myWindow'</p>");
  //   }
  //   close(){
  // window.close();
  // }
}
