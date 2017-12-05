import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {

  transactionNumber:string;
  constructor() { }

  ngOnInit() {
  }

  clearTransaction(){
    this.transactionNumber=null;
  }

}
