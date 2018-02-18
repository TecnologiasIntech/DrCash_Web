import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Globals} from "../../statics/globals";
import {DateService} from "../../services/date.service";
import {User} from "../../interfaces/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {UserService} from "../../services/user.service";
import {forEach} from "@angular/router/src/utils/collection";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {LogService} from "../../services/log.service";
import {alertService} from "../../services/alert.service";
import {Register} from "../../interfaces/register";
import {SettingService} from "../../services/setting.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    newUser: User = {} as User;
    registers: Register[];
    registerID: number;

    constructor(private _activeModal: NgbActiveModal,
                private _usersService: UserService,
                private _logService: LogService,
                private _alertService: alertService,
                private _settingsService: SettingService) {
        this._settingsService.getRegisters()
            .then((registers: Register[]) => {
                this.registers = registers;
            })
    }

    @ViewChild('username')
    username: ElementRef;
    @ViewChild('firstName')
    firstName: ElementRef;
    @ViewChild('lastName')
    lastName: ElementRef;
    @ViewChild('email')
    email: ElementRef;

    securityLevel: string = "0";

    users;
    showSuccessAlert: boolean = false;

    ngOnInit() {
    }

    saveUser() {
        if (!this.areEmptyFields()) {
            this._usersService.existUser(this.newUser.username).then(exist => {
                if (!exist) {
                    this.updateSecurityLevel();
                    this.loadUserDefaultData();
                    this.setUserClinic();
                    this._usersService.getUserID()
                        .then((response: number) => {
                            this.newUser.userId = response;
                            this.setUserPassword();
                            this._usersService.createNewUser(this.newUser.email, this.newUser.password)
                                .then(() => {
                                    if (ValidationService.errorInField(this.registerID)) {
                                        this.registerID = 0;
                                    } else {
                                        this.newUser.registerId = this.registerID;
                                    }
                                    this._usersService.updateUser(this.newUser);
                                    this.setLog();
                                    this.showNewPasswordAler(this.newUser.password);
                                })
                                .catch(error => {
                                    console.log(error);
                                })

                        })
                } else {
                    this.enableSuccesfullyAlert();
                }
            })
        }
    }

    setLog() {
        let message: string = Globals.userInfo.username + " Sign Up the new user " + this.newUser.username;
        this._logService.setLog(message);
    }

    setUserClinic() {
        this.newUser.clinic = Globals.userInfo.clinic;
    }

    setUserPassword() {
        if (Globals.settings.useDefaultPassword) {
            this.newUser.password = Globals.settings.defaultPassword;
        }
        else {
            this.newUser.password = this.generateRandomPassword();
        }
    }

    showNewPasswordAler(password: string) {
        this._alertService.confirmSuccess("New Password", password)
            .then(() => {
                this._activeModal.close();
            });
    }

    generateRandomPassword() {
        let randomPassword: string = Math.random().toString(36).slice(-8);
        return randomPassword;
    }

    updateSecurityLevel() {
        this.newUser.securityLevel = parseInt(this.securityLevel);
        this.newUser.level = {
            '-cero':{
                securityLevel: parseInt(this.securityLevel)
            }
        }
    }

    resetNewUser() {
        this.newUser = {} as User;
    }

    areEmptyFields() {
        if (ValidationService.errorInField(this.newUser.username)) {
            this.username.nativeElement.focus();
            return true;
        }
        if (ValidationService.errorInField(this.newUser.firstName)) {
            this.firstName.nativeElement.focus();
            return true;
        }
        if (ValidationService.errorInField(this.newUser.lastName)) {
            this.lastName.nativeElement.focus();
            return true;
        }
        if (ValidationService.errorInField(this.newUser.email)) {
            this.email.nativeElement.focus();
            return true;
        }
        else {
            return false;
        }

    }

    closeModal() {
        this._activeModal.close();
    }

    enableSuccesfullyAlert() {
        this.showSuccessAlert = true;

        setTimeout(() => {
            this.showSuccessAlert = false;
        }, 3000);
    }

    loadUserDefaultData() {
        this.newUser.activeAccount = true;
        this.newUser.passwordReset = true;
        this.newUser.modifiedBy = Globals.userInfo.userId;
        this.newUser.modificationDate = DateService.getCurrentDate().toString();
        this.newUser.createdBy = Globals.userInfo.userId;
        this.newUser.creationDate = this.newUser.modificationDate;
    }
}
