import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

import {  AuthComponent } from './auth.component';
import {LoginComponent} from '../login/login.component'

//Services
import {alertService} from '../../services/alert.service'

const   AUTH_ROUTE = [
  { path: '', component: AuthComponent}
];

@NgModule ({
  declarations: [
      AuthComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild(AUTH_ROUTE)
  ],
    providers: [
        alertService,
        LoginComponent
    ]
})

export class AuthModule {  }
