import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {CashOutComponent} from "../../modals/cash-out/cash-out.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _modals:NgbModal) {
    _modals.open(CashOutComponent,{backdrop:'static', keyboard:false, size:'lg'})
  }

  ngOnInit() {
  }


}
