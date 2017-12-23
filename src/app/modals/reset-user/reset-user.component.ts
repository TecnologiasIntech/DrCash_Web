import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Globals} from "../../statics/globals";
import {forEach} from "@angular/router/src/utils/collection";
import {User} from "../../interfaces/user";

@Component({
    selector: 'app-reset-user',
    templateUrl: './reset-user.component.html',
    styleUrls: ['./reset-user.component.scss']
})
export class ResetUserComponent implements OnInit {

    constructor() {
    }

    @ViewChild('securityLevel')
    securityLevel: ElementRef;

    @ViewChild('confirmPasswordInput')
    confirmPasswordInput: ElementRef;

    upperCaseLetters: string [] = [];
    lowerCaseLetters: string [] = [];
    specialCharacters: string [] = [];

    uppercaseInPassword = false;
    lowercaseInPassword = false;
    specialCharacterInPassword = false;
    acceptablePasswordLength = false;

    editableUser: User = {} as User;

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
    }

    saveUser(){
        if(this.doThePasswordsMatch()){
            console.log("Usuario Registrado")
        }else{
            this.focusConfirmPasswordInput();
            this.showPasswordDoNotMatchWarning();
        }
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

    disableAlert(){
        this.showWarning = false;
    }

    displayPasswordLevel() {
        this.disableAlert();
        this.resetPasswordSecurityLevel()
        this.validateCharactersInPassword();
        this.validatePasswordLength();
        this.sumPasswordLevel();
        console.log(this.passwordLevel)

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
    }
}
