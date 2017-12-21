import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {Globals} from "../../statics/globals";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private _activeModal: NgbActiveModal,
              private _modal: NgbModal) { }

  ngOnInit() {
  }

  closeModal(){
    this._activeModal.close();
  }

  openSignUpModal(){
      this._modal.open(SignUpComponent, Globals.optionModalLg);
  }

}
