import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Globals} from "../../statics/globals";
import * as firebase from "firebase";
import Settings = firebase.firestore.Settings;
import {Setting} from "../../interfaces/setting";
import {SettingService} from "../../services/setting.service";
import {settings} from "cluster";
import {ValidationService} from "../../services/validation.service";

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
      this.parseBooleanToString();


  }

    @ViewChild('defaultPasswordInput')
    defaultPasswordInput: ElementRef;

  settings: Setting = {} as Setting;

  leaveMoneyInRegister: string;
  sendPassword: string;
  useDefaultPassword: string;
  ngOnInit() {
      this.enableOrDisableDefaultPasswordInput();
  }

  saveSettings(){
      if(this.isDefaultPasswordEnabledAndFilled()){
          this.prepareSettings();
          this._settingService.setSettings(this.settings);
      }
  }

  prepareSettings(){
      this.settings.leaveMoneyInRegister = this.parseBoolean(this.leaveMoneyInRegister);
      this.settings.sendPasswordThroughEmail = this.parseBoolean(this.sendPassword);
      this.settings.useDefaultPassword = this.parseBoolean(this.useDefaultPassword);
      this.settings.idleTime = parseInt(this.settings.idleTime.toLocaleString());
  }

  parseBoolean(text:string){
      if(text.toLowerCase() == "true") return true;
      if(text.toLowerCase() == "false") return false;
  }

  parseBooleanToString(){
      if(this.settings.leaveMoneyInRegister)this.leaveMoneyInRegister = "true";
      if(!this.settings.leaveMoneyInRegister)this.leaveMoneyInRegister = "false";
      if(this.settings.sendPasswordThroughEmail)this.sendPassword = "true";
      if(!this.settings.sendPasswordThroughEmail)this.sendPassword = "false";
      if(this.settings.useDefaultPassword)this.useDefaultPassword = "true";
      if(!this.settings.useDefaultPassword)this.useDefaultPassword = "false";
  }

  enableOrDisableDefaultPasswordInput(){
      console.log(this.useDefaultPassword)
          if (this.useDefaultPassword == "true") {
              this.defaultPasswordInput.nativeElement.removeAttribute('disabled');
          } else {
              this.defaultPasswordInput.nativeElement.setAttribute('disabled', 'disabled');
          }
  }

  isDefaultPasswordEnabledAndFilled(){
      if(this.useDefaultPassword == "true" && ValidationService.errorInField(this.settings.defaultPassword)){
          this.defaultPasswordInput.nativeElement.focus();
          return false;
      }
      return true;
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