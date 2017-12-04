import {Component, OnInit, ViewChild} from '@angular/core';
import {ValidationService} from "../../services/validation.service";
import {isUndefined} from "util";
import {init} from "protractor/built/launcher";
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../interfaces/transaction";
import {TRANSACTIONTYPE} from "../../enums/enums";
import {DateService} from "../../services/date.service";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-initial-cash',
    templateUrl: './initial-cash.component.html',
    styleUrls: ['./initial-cash.component.scss']
})
export class InitialCashComponent implements OnInit {

    errorInitialCash: boolean = false;
    transaction:Transaction = TransactionService.getDefaultValuesToTransaction();
    @ViewChild('cash')
    cash: any;

    constructor(private _transactionsService: TransactionService,
                private _activeModal:NgbActiveModal) {
    }

    ngOnInit() {
    }

    setInitialCash(initialCash:string){
        if(!ValidationService.errorInField(initialCash)){
            this.transaction.dateRegistered = DateService.getCurrentDate();
            this.transaction.type = TRANSACTIONTYPE.INITIALCASH;
            this.transaction.cash = parseInt(initialCash);
            this._transactionsService.setTransaction(this.transaction);
            this._activeModal.close();
        }else{
            this.errorInitialCash = true;
            this.cash.nativeElement.focus();
        }
    }


}
