import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Globals} from "../../statics/globals";
import * as firebase from "firebase";
import Settings = firebase.firestore.Settings;
import {Setting} from "../../interfaces/setting";
import {SettingService} from "../../services/setting.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private _settingService: SettingService) {
      this._settingService.getSettings()
          .then((response: Setting) => {
              this.settings = response;
          })
  }

  settings: Setting = {} as Setting;
  ngOnInit() {

  }

  saveSettings(){
      this._settingService.setSettings(this.settings);
  }

    restrictNumeric(e) {
        let input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which === 45) {
            return false;
        }
        if (e.which === 46) {
          return false;
        }
        if (e.which < 33) {
            return true;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }

}