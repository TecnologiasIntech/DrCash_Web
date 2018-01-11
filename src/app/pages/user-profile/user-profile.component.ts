import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {Globals} from "../../statics/globals";
import {ValidationService} from "../../services/validation.service";
import {setTimeout} from "timers";
import {UserService} from "../../services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ManageUsersComponent} from "../../modals/manage-users/manage-users.component";
import {USERTYPE} from "../../enums/enums";
import {SignUpComponent} from "../../modals/sign-up/sign-up.component";
import {LogService} from "../../services/log.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    constructor(private _userService: UserService,
                private _modal: NgbModal,
                private _logService: LogService) {
        this.editableUser = Globals.userInfo;
    }

    editableUser: User;

    securityQuestions: string[] = Globals.securityQuestions;

    newPassword: string;
    confirmPassword: string;
    showWarning = false;
    warning: string;
    showSuccessAlert: boolean = false;

    ngOnInit() {
        if (Globals.userInfo.securityLevel == USERTYPE.SUPERVISOR ||
            Globals.userInfo.securityLevel == USERTYPE.ADMINISTRATOR) {
            this.showManageUsers = true;
        }
    }

    editProfile: boolean = false;
    showManageUsers: boolean = false;

    openManageUsersModal() {
        this._modal.open(ManageUsersComponent, Globals.optionModalLg).result.then(
            (result) => {
                this._modal.open(SignUpComponent, Globals.optionModalLg).result.then(
                    result => {
                        this.openManageUsersModal();
                    }, reason => {
                    }
                )
            }, (reason) => {
            }
        )
    }

    areBasicFieldsEmpty() {
        return (ValidationService.errorInField(this.editableUser.firstName) ||
            ValidationService.errorInField(this.editableUser.lastName) ||
            ValidationService.errorInField(this.editableUser.email) ||
            ValidationService.errorInField(this.editableUser.securityAnswer))
    }

    isOnePasswordFieldEmptyButTheOtherOneNot() {
        if (ValidationService.errorInField(this.newPassword)) {
            return (!ValidationService.errorInField(this.confirmPassword))
        }
        else {
            return (ValidationService.errorInField(this.confirmPassword))
        }
    }

    doThePasswordsMatch() {
        return (this.newPassword == this.confirmPassword);
    }

    disableWarnings() {
        this.showWarning = false;
    }

    showEmptyFieldsWarning() {
        this.warning = "You must fill all te fields.";
        this.showWarning = true;
    }

    showPasswordsDoNotMatchWarning() {
        this.warning = "Passwords do not match";
        this.showWarning = true;
    }

    enableSuccesfullyAlert() {
        this.showSuccessAlert = true;

        setTimeout(() => {
            this.showSuccessAlert = false;
        }, 5000);
    }

    saveNewPassword() {
        if (this.doThePasswordsMatch() && !ValidationService.errorInField(this.newPassword)) {
            this.editableUser.password = this.newPassword;
        }
    }

    areProfileFieldsReady() {
        if (this.areBasicFieldsEmpty()) {
            this.showEmptyFieldsWarning();
            return false;
        } else {
            if (this.isOnePasswordFieldEmptyButTheOtherOneNot()) {
                debugger;
                this.showEmptyFieldsWarning();
                return false
            }
            else {
                if (this.doThePasswordsMatch()) {
                    return true;
                } else {
                    this.showPasswordsDoNotMatchWarning();
                }
            }
        }
    }

    cancelEditProfile() {
        this.editProfile = false;
    }

    finishEditProfile() {
        if (this.areProfileFieldsReady()) {
            this.saveNewPassword();
            this._userService.updateUser(this.editableUser);
            this.editableUser = Globals.userInfo;
            this.setLog()
            this.editProfile = false;
            this.enableSuccesfullyAlert();
        }
    }

    setLog() {
        let message: string = Globals.userInfo.username + " edited his user.";
        this._logService.setLog(message)
    }
}