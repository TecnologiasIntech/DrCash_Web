import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Transaction} from "../../interfaces/transaction";

@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent implements OnInit {

  constructor(private _activeModal: NgbActiveModal) { }

  newTransaction: Transaction = {} as Transaction;


  ngOnInit() {
  }

  closeModal(){
    this._activeModal.close();
  }

}
