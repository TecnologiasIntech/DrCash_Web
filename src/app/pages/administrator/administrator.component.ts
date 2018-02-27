import {Component} from '@angular/core';
import {alertService} from "../../services/alert.service";
import {SettingService} from "../../services/setting.service";

@Component({
    selector: 'app-administrator',
    templateUrl: './administrator.component.html',
    styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent {

    myMac:string;

    constructor(private _alertService: alertService,
                private _settingsServices:SettingService) {
        _settingsServices.getMac()
            .then((response:string)=>{
                this.myMac = response;
            })
    }

    showSuccessFully(){
        this._alertService.success('Machine Resgistered!', '');
    }

    registerMyMac(){
        console.log(this.myMac)
        this._settingsServices.thisMachineIsRegistered(this.myMac)
            .then(()=>{
                this.showSuccessFully();
            })
            .catch(()=>{
                this._settingsServices.registerMac(this.myMac);
            })

    }

}
