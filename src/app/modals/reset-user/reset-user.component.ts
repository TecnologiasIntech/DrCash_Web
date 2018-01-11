import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Globals} from "../../statics/globals";
import {forEach} from "@angular/router/src/utils/collection";
import {User} from "../../interfaces/user";
import {ValidationService} from "../../services/validation.service";
import {UserService} from "../../services/user.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LogService} from "../../services/log.service";

@Component({
    selector: 'app-reset-user',
    templateUrl: './reset-user.component.html',
    styleUrls: ['./reset-user.component.scss']
})
export class ResetUserComponent implements OnInit {

    constructor(private _userServices: UserService,
                private _activeModal: NgbActiveModal,
                private _logService: LogService) {
    }

    @ViewChild('securityLevel')
    securityLevel: ElementRef;

    @ViewChild('confirmPasswordInput')
    confirmPasswordInput: ElementRef;

    @ViewChild('securityAnswer')
    securityAnswer: ElementRef;

    upperCaseLetters: string [] = [];
    lowerCaseLetters: string [] = [];
    specialCharacters: string [] = [];

    uppercaseInPassword = false;
    lowercaseInPassword = false;
    specialCharacterInPassword = false;
    acceptablePasswordLength = false;

    editableUser: User = Globals.userInfo;

    confirmPassword: string = "";

    securityQuestions: string[] = Globals.securityQuestions;

    passwordLevel: number = 0;
    passwordStregth: string = "Weak";

    showWarning: boolean = false;
    warning: string = "";

    ngOnInit() {
        this.addLowerCaseToArray();
        this.addSpecialCharactersToArray();
        this.addUppercaseLetterToArray();
        this.editableUser.password = "";
    }

    closeApp(){
        window.close();
    }

    saveUser(){
        if(this.isResetUserReady()){
            this.editableUser.passwordReset = false;
            this._userServices.updateUser(this.editableUser);
            this._userServices.updatePassword(this.editableUser.password);
            this.setLog();
            this._activeModal.close();

        }
    }

    setLog(){
        let message:string = Globals.userInfo.username+" change the password correctly.";
        this._logService.setLog(message)
    }

    isResetUserReady(){
        if(this.doThePasswordsMatch()){
            if(this.isPasswordLevelStrong()){
                return(!this.isSecurityQuestiondOrSeucirtyAnswerEmpty());
            }else{
                return false;
            }
        }else{
            this.focusConfirmPasswordInput();
            this.showPasswordDoNotMatchWarning();
            return false;
        }
    }

    isPasswordLevelStrong(){
        if(this.passwordLevel < 4){
            this.showPasswordMustBeStrongWarning();
            return false;
        }
        else{
            return true;
        }
    }

    showPasswordMustBeStrongWarning(){
        this.warning = "Your password must be STRONG";
        this.showWarning = true;
    }

    doThePasswordsMatch(){
        return (this.confirmPassword == this.editableUser.password);
    }

    focusConfirmPasswordInput(){
        this.confirmPasswordInput.nativeElement.focus();
    }

    showPasswordDoNotMatchWarning(){
        this.warning = "Passwords must match.";
        this.showWarning = true;
    }

    isSecurityQuestiondOrSeucirtyAnswerEmpty(){
        if(ValidationService.errorInField(this.editableUser.securityQuestion)){
            this.showSecurityQuestionWarning()
            return true;
        }else{
            if(ValidationService.errorInField(this.editableUser.securityAnswer)){
                this.focusSecurityAnswer()
                return true;
            }else{
                return false;
            }
        }
    }

    showSecurityQuestionWarning(){
        this.warning = "You must choose a security question.";
        this.showWarning = true;
    }

    focusSecurityAnswer(){
        this.securityAnswer.nativeElement.focus();
    }

    disableAlert(){
        this.showWarning = false;
    }

    displayPasswordLevel() {
        this.disableAlert();
        this.resetPasswordSecurityLevel()
        this.validateCharactersInPassword();
        this.validatePasswordLength();
        this.sumPasswordLevel();

        let color: string;
        switch (this.passwordLevel) {
            case 0:
            case 1:
                this.passwordStregth = "Weak";
                color = "text-danger";
                break;
            case 2:
                this.passwordStregth = "Good";
                color = "text-warning";
                break;
            case 3:
                this.passwordStregth = "Good";
                color = "text-warning";
                break;
            case 4:
                this.passwordStregth = "Strong";
                color = "text-success";
                break;
        }

        this.changePasswordLevelColor(color);
    }

    changePasswordLevelColor(color: string) {
        this.securityLevel.nativeElement.removeAttribute('class');
        this.securityLevel.nativeElement.setAttribute('class', color);
    }

    resetPasswordSecurityLevel(){
        this.passwordLevel = 0;
        this.uppercaseInPassword = this.lowercaseInPassword = this.specialCharacterInPassword = this.acceptablePasswordLength = false;
    }
    sumPasswordLevel(){
        if(this.uppercaseInPassword) this.passwordLevel ++;
        if(this.lowercaseInPassword) this.passwordLevel ++;
        if(this.specialCharacterInPassword) this.passwordLevel ++;
        if(this.acceptablePasswordLength) this.passwordLevel ++;
    }

    validateCharactersInPassword() {
        this.validateUpperCase();
        this.validateLowerCase()
        this.validateSpecialCharacters();
    }

    validateUpperCase() {
        for (let i = 0; i < this.upperCaseLetters.length; i++) {
            if ((this.editableUser.password).includes(this.upperCaseLetters[i])) {
                this.uppercaseInPassword = true;
                break;
            }
        }
    }

    validateLowerCase() {
        for (let i = 0; i < this.lowerCaseLetters.length; i++) {
            if ((this.editableUser.password).includes(this.lowerCaseLetters[i])) {
                this.lowercaseInPassword = true;
                break;
            }
        }
    }

    validateSpecialCharacters() {
        for (let i = 0; i < this.specialCharacters.length; i++) {
            if ((this.editableUser.password).includes(this.specialCharacters[i])) {
                this.specialCharacterInPassword = true;
                break;
            }
        }
    }

    validatePasswordLength() {
        if (this.editableUser.password.length > 8) {
            this.acceptablePasswordLength = true;
        }

    }

    addUppercaseLetterToArray() {
        for (let i = 65; i <= 90; i++) {
            this.upperCaseLetters.push(String.fromCharCode(i));
        }
    }

    addLowerCaseToArray() {
        for (let i = 97; i <= 122; i++) {
            this.lowerCaseLetters.push(String.fromCharCode(i));
        }
    }

    addSpecialCharactersToArray() {
        this.specialCharacters.push(String.fromCharCode(36)) //$
        this.specialCharacters.push(String.fromCharCode(64)) //@
        this.specialCharacters.push(String.fromCharCode(33)) //!
        this.specialCharacters.push(String.fromCharCode(37)) //%
        this.specialCharacters.push(String.fromCharCode(34)) //*
        this.specialCharacters.push(String.fromCharCode(35)) //#
        this.specialCharacters.push(String.fromCharCode(63)) //?
        this.specialCharacters.push(String.fromCharCode(38)) //&
        this.specialCharacters.push(String.fromCharCode(42)) //*
    }
}
