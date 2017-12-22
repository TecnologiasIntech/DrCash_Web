import { Component, OnInit } from '@angular/core';
import {Globals} from "../../statics/globals";

@Component({
  selector: 'app-reset-user',
  templateUrl: './reset-user.component.html',
  styleUrls: ['./reset-user.component.scss']
})
export class ResetUserComponent implements OnInit {

  constructor() { }

  securityQuestions: string[] = Globals.securityQuestions;

  ngOnInit() {
  }

}
