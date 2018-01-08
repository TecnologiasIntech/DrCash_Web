import {Component, OnInit} from '@angular/core';
import {SettingService} from "../../services/setting.service";
import {DateService} from "../../services/date.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {alertService} from "../../services/alert.service";

@Component({
    selector: 'app-new-register',
    templateUrl: './new-register.component.html',
    styleUrls: ['./new-register.component.scss']
})
export class NewRegisterComponent implements OnInit {

    key: string;
    computerName: string;
    registerID: number;

    constructor(private _settingsService: SettingService,
                private _activeModal: NgbActiveModal,
                private _alertService: alertService) {
    }

    ngOnInit() {
        this.getRegisterId();
        this.getRegisterKey();
        this.createDefaultRegister();
    }

    getMachineName() {
        this._settingsService.getMachineName()
            .then((response: string) => {
                this.computerName = response;
            })
    }

    getRegisterId() {
        this._settingsService.getLastRegisterID()
            .then((response: number) => {
                this.registerID = response;
            })
    }

    getRegisterKey() {
        this.key = DateService.getCurrentDate().toString();
    }

    createRegister() {
        this._settingsService.setRegister(this.registerID, this.computerName, this.key);
        this._alertService.confirmSuccess("Successfully Saved", "")
            .then(() => {
                this._activeModal.close();
            })
    }

    createDefaultRegister() {
        this._settingsService.createDefaultRegister(this.key);
    }

    cancel() {
        this._settingsService.deleteRegister(this.key);
        this._activeModal.dismiss();
    }

}
