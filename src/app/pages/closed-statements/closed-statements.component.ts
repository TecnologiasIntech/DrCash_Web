import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-closed-statements',
    templateUrl: './closed-statements.component.html',
    styleUrls: ['./closed-statements.component.scss']
})
export class ClosedStatementsComponent implements OnInit {

    transactionNumber: number;
    dateTo: string;
    dateFrom:string;

    constructor() {
    }

    ngOnInit() {
    }

    cleanFields(){

    }

    searchTransactions(){
        
    }

}
