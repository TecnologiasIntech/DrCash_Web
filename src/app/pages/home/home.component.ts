
import {CashOutComponent} from "../../modals/cash-out/cash-out.component";
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InitialCashComponent} from "../../modals/initial-cash/initial-cash.component";
import {Globals} from "../../statics/globals";
import {LoginComponent} from "../../modals/login/login.component";
import {CashInComponent} from "../../modals/cash-in/cash-in.component";
import {AuthorizationComponent} from "../../modals/authorization/authorization.component";
import {RefundComponent} from "../../modals/refund/refund.component";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private _modal: NgbModal,
                private _globals: Globals) {
        _modal.open(LoginComponent,Globals.optionModalLg);
      // _modal.open(AuthorizationComponent,Globals.optionModalLg).result.then((result)=>{
      //     debugger
      //     if(result){
      //         _modal.open(RefundComponent,Globals.optionModalLg);
      //     }
      // })

  }

  ngOnInit() {

  }
}
