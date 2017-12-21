import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {Globals} from "../../statics/globals";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  editableUser: User = Globals.userInfo;

  newPassword: string;
  confirmPassword: string;
  showWarning = false;
  warning: string;

  ngOnInit() {
  }

  editProfile: boolean = false;

  areBasicFieldsEmpty(){
    return(ValidationService.errorInField(this.editableUser.firstName) ||
        ValidationService.errorInField(this.editableUser.lastName) ||
        ValidationService.errorInField(this.editableUser.email))
  }

  isOnePasswordFieldEmptyButTheOtherOneNot(){
    if(ValidationService.errorInField(this.newPassword)){
      return (!ValidationService.errorInField(this.confirmPassword))
    }
    else{
      return(ValidationService.errorInField(this.confirmPassword))
    }
  }

  doThePasswordsMatch(){
    return(this.newPassword == this.confirmPassword);
  }

  disableWarnings(){
    this.showWarning = false;
  }

  showEmptyFieldsWarning(){
    this.warning ="You must fill all te fields.";
    this.showWarning = true;
  }

  showPasswordsDoNotMatchWarning(){
    this.warning = "Passwords do not match";
    this.showWarning = true;
  }

  areProfileFieldsReady(){
    if(this.areBasicFieldsEmpty()){
      this.showEmptyFieldsWarning();
      return false;
    }else{
      if(this.isOnePasswordFieldEmptyButTheOtherOneNot()){
        debugger;
        this.showEmptyFieldsWarning();
        return false
      }
      else{
        if(this.doThePasswordsMatch()){
          return true;
        }else{
          this.showPasswordsDoNotMatchWarning();
        }
      }
    }
  }

  cancelEditProfile(){
    this.editProfile = false;
  }

  finishEditProfile(){
    if(this.areProfileFieldsReady()){
      Globals.userInfo = this.editableUser;
      this.editProfile = false;
    }
  }

}
