import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.scss']
})
export class CashInComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal(){
    this.activeModal.close();
  }

}
