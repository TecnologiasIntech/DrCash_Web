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
import {AuthorizationComponent} from "../../modals/authorization/authorization.component";
import {window} from "rxjs/operator/window";
import {AngularFireDatabase} from "angularfire2/database";
import {TransactionService} from "../../services/transaction.service";
import {FirebaseObjectFactoryOpts} from "angularfire2/database/interfaces";
import {DateService} from "../../services/date.service";



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor(private _modal: NgbModal,
                private _globals: Globals,
                private db: AngularFireDatabase,
                private  _dateService:DateService) {
        _modal.open(LoginComponent,Globals.optionModalLg).result.then((result)=>{
            let typeUser:any = Globals.userInfo.securityLevel;
            if(typeUser==0){
                db.list('clinicas/'+Globals.userInfo.clinic+'/'+Globals.userInfo.username, {
                    query:{
                        orderByChild:'dateRegistered',
                        startAt: this._dateService.getInitialCurrentDate(),
                        endAt: this._dateService.getEndCurrentDate()
                    }
                }).subscribe((result:any)=>{
                    console.log(result);
                })
            }else{
                if(typeUser==1 || typeUser==2) {
                    db.list('clinicas/' + Globals.userInfo.clinic, {
                        query: {

                        }
                    }).subscribe((result: any) => {
                        debugger
                        for (let i=0; i<result.length ; i++) {
                            for (let j=0; j<result[i].length ; j++) {
                                console.log(result[i][j]);
                            }
                        }
                    })
                }
            }
        })
      // _modal.open(AuthorizationComponent,Globals.optionModalLg).result.then((result)=>{
      //     debugger
      //     if(result){
      //         _modal.open(RefundComponent,Globals.optionModalLg);
      //     }
      // })
      //   let aa:FirebaseObjectFactoryOpts





  }

  ngOnInit() {
  }

    openCashIn() {
        this._modal.open(CashInComponent,Globals.optionModalLg);
    }

    openCashOut() {
        this._modal.open(CashOutComponent,Globals.optionModalLg);
    }

    openRefund() {
        this._modal.open(RefundComponent,Globals.optionModalLg);
    }

    openSignUp() {
        this._modal.open(SignUpComponent,Globals.optionModalLg);
    }

    openCloseDate() {
        this._modal.open(CloseDateComponent,Globals.optionModalLg);
    }
}
