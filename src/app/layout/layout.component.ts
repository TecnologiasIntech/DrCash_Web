import {Component, OnInit} from '@angular/core';
import {SharedService} from '../shared/services/shared.service';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {Globals} from "../statics/globals";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CredentialsComponent} from "../modals/credentials/credentials.component";
import {ValidationService} from "../services/validation.service";
import construct = Reflect.construct;

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
                private _modal: NgbModal) {
        sharedService.maThemeSubject.subscribe((value) => {
            this.maTheme = value
        });

        this.idleCheck();

    }

    idleCheck() {
        this.idle.setIdle(5);
        this.idle.setTimeout(5);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        this.idle.onTimeout.subscribe(() => {
            if(Globals.afk == false){
                this._modal.open(CredentialsComponent, Globals.optionModalLg).result
                    .then(() => {
                        this.reset();
                    })
            }else{
                this.reset();
            }
        });

        this.idle.onInterrupt.subscribe(()=>this.reset());
        this.reset();

    }

    reset() {
        if(ValidationService.errorInField(Globals.userInfo)){
            this.idle.setIdle(5);
        }else{
            let idleTime: number = (parseInt(Globals.settings.idleTime.toString()) * 60)-5;
            this.idle.setIdle(idleTime);
        }
        Globals.afk = false;
        this.idle.watch();

    }

    ngOnInit() {
    }
}
