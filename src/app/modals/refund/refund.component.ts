import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  refound:number=0;
  transactionNumber:string;
  logComment:string;
  logComment2:string;
  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit() {
  }

  clearTransaction(){
    this.transactionNumber=null;
  }

  closeRefund(){
    this._activeModal.dismiss();
  }

}
