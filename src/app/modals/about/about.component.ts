import {Component, OnInit} from '@angular/core';
import {Globals} from "../../statics/globals";
import {USERTYPE} from "../../enums/enums";
import {SettingService} from "../../services/setting.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    securityLevel:string;
    computerName:string;

    constructor(private _settingsService:SettingService,
                private _activeModal: NgbActiveModal) {
        this.getUserType();
        this.getComputerName();
    }

    getUserType(){
        switch (Globals.userInfo.securityLevel){
            case USERTYPE.USER:
                this.securityLevel = "USER";
                break;

            case USERTYPE.SUPERVISOR:
                this.securityLevel = "SUPERVISOR";
                break;

            case USERTYPE.ADMINISTRATOR:
                this.securityLevel = "ADMINISTRATOR";
                break;
        }
    }

    getComputerName(){
        this._settingsService.getMachineName()
            .then((response:string)=>{
                this.computerName = response;
            })
    }

    closeModal(){
        this._activeModal.close();
    }

    ngOnInit() {
    }

}
