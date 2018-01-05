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

    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;

    constructor(private sharedService: SharedService,
                private idle: Idle,
                private keepalive: Keepalive,
                private _modal: NgbModal,) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maTheme = value
        });

        idle.setIdle(5);
        idle.setTimeout(5);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            console.log("AFK");
        });
        this.reset();
    }

    reset() {
        this.idle.watch();
    }

    ngOnInit() {
    }
}
