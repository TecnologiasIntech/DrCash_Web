import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

import { ContraseniaOlvidadaComponent } from "./contrasenia-olvidada.component";

//Services
import {alertService} from '../../services/alert.service'

const CONTRASENIA_ROUTE = [
  { path: '', component: ContraseniaOlvidadaComponent }
];

@NgModule ({
  declarations: [
      ContraseniaOlvidadaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild(CONTRASENIA_ROUTE)
  ],
    providers: [
        alertService
    ]
})

export class ContraseniaOlvidadaModule {  }
