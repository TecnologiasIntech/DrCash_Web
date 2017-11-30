import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

import { LoginComponent } from "./login.component";
//import {LoginComponent} from '../login/login.component'

//Services
import {alertService} from '../../services/alert.service';

const LOGIN_ROUTE = [
  { path: '', component: LoginComponent }
];

@NgModule ({
  declarations: [

  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild(LOGIN_ROUTE)
  ],
    providers: [
        alertService
    ]
})

export class LoginModule {  }
