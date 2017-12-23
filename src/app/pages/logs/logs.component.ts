import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../interfaces/transaction";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    transactions: Transaction[] = [];
    transaction: Transaction = {} as Transaction;
    username: number;
    dateFrom: any;
    dateTo: any;

    cleanFields(){
        this.username = null;
        this.dateFrom = null;
        this.dateTo = null;

        this.transaction = {} as Transaction;
        this.transactions = [];
    }
}



