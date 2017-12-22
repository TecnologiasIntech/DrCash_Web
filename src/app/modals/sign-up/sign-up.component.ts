import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Globals} from "../../statics/globals";
import {DateService} from "../../services/date.service";
import {User} from "../../interfaces/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidationService} from "../../services/validation.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    newUser:User = {} as User;

    constructor(private _activeModal: NgbActiveModal,
                private _userService: UserService) {
    }
    @ViewChild('username')
    username: ElementRef;
    @ViewChild('firstName')
    firstName: ElementRef;
    @ViewChild('lastName')
    lastName: ElementRef;
    @ViewChild('email')
    email: ElementRef;

    securityLevel:string = "0";

    ngOnInit() {
    }

    saveUser(){
        if(!this.areEmptyFields()){
            this.updateSecurityLevel();
            this.setActiveUser();
            this.setPasswordReset();
            this.setUserClinic();
            this._userService.updateUser(this.newUser);
            this.resetNewUser();

        }
    }

    setUserClinic(){
        this.newUser.clinic = Globals.userInfo.clinic;
    }

    updateSecurityLevel(){
        this.newUser.securityLevel = parseInt(this.securityLevel);
    }

    setActiveUser(){
        this.newUser.activeAccount = true;
    }

    setPasswordReset(){
        this.newUser.passwordReset = true;
    }

    resetNewUser(){
        this.newUser = {} as User;
    }

    areEmptyFields(){
        if(ValidationService.errorInField(this.newUser.username)){
            this.username.nativeElement.focus();
            return true;
        }
        if(ValidationService.errorInField(this.newUser.firstName)){
            this.firstName.nativeElement.focus();
            return true;
        }
        if(ValidationService.errorInField(this.newUser.lastName)){
            this.lastName.nativeElement.focus();
            return true;
        }
        if(ValidationService.errorInField(this.newUser.email)){
            this.email.nativeElement.focus();
            return true;
        }
        else{
            return false;
        }

    }

    closeModal(){
        this._activeModal.close();
    }

    loadUserDefaultData(){
        // TODO: Verificar si es de utilidad el userID y si no entonces eliminarlo
        this.newUser.activeAccount = true;
        this.newUser.passwordReset = true;
        this.newUser.modifiedBy = Globals.userInfo.userId;
        this.newUser.modificationDate = DateService.getCurrentDate().toString();
        this.newUser.createdBy = Globals.userInfo.userId;
        this.newUser.creationDate = this.newUser.modificationDate;
    }
}
