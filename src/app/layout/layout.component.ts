import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {Globals} from "../statics/globals";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CredentialsComponent} from "../modals/credentials/credentials.component";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit {
    maTheme: string = this.sharedService.maTheme;

    constructor(private sharedService: SharedService,
                private idle: Idle, private keepalive: Keepalive,
                private _modal: NgbModal,) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maTheme = value
        })

        idle.setIdle((Globals.settings.idleTime * 60));
        idle.setTimeout(1);
        idle.onTimeout.subscribe(() => {
            this._modal.open(CredentialsComponent, Globals.optionModalLg);
        });
    }

    ngOnInit() {
    }
}
