import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {Globals} from "../../statics/globals";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {forEach} from "@angular/router/src/utils/collection";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {ValidationService} from "../../services/validation.service";
import {USERTYPE} from "../../enums/enums";
import {LogService} from "../../services/log.service";

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

    constructor(private _activeModal: NgbActiveModal,
                private _modal: NgbModal,
                private _usersService: UserService,
                private _logService:LogService) {
    }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers(){
        if(Globals.userInfo.securityLevel == USERTYPE.SUPERVISOR){
            this._usersService.getUsersByMyClinic().then(response => {
                this.users = response;
                console.log(this.users);
            })
        }else if(Globals.userInfo.securityLevel == USERTYPE.ADMINISTRATOR){
            this._usersService.getAllUsers().then(response => {
                this.users = response;
                console.log(this.users);
            })
        }

    }

    users;

    editableUser: User = {} as User;
    securityLevel: string;

    @ViewChild('firstName')
    firstName: ElementRef;
    @ViewChild('lastName')
    lastName: ElementRef;
    @ViewChild('email')
    email: ElementRef;

    sendUserToEdit(_user: User) {
        this.editableUser = _user;
        this.securityLevel = this.editableUser.securityLevel.toString();
        console.log(this.editableUser.securityLevel);
    }

    saveUser() {
        if(!this.isUsernameUndefined()){
            if (!this.areEmptyFields()) {
                this.saveSecurityLevel();
                this._usersService.updateUser(this.editableUser);
                this.setLog();
                this.resetEditableUser();
            }
        }
        else{
            this.resetEditableUser();
        }

    }

    setLog(){
        let message:string = Globals.userInfo.username+" edited the user "+this.editableUser.username;
        this._logService.setLog(message)
    }

    saveSecurityLevel(){
        this.editableUser.securityLevel = parseInt(this.securityLevel);
    }

    areEmptyFields() {
        if (ValidationService.errorInField(this.editableUser.firstName)) {
            this.firstName.nativeElement.focus();
            return true;
        } else {
            if (ValidationService.errorInField(this.editableUser.lastName)) {
                this.lastName.nativeElement.focus();
                return true;
            } else {
                if (ValidationService.errorInField(this.editableUser.email)) {
                    this.email.nativeElement.focus();
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    resetEditableUser() {
        this.editableUser = {} as User;
    }

    isUsernameUndefined(){
        return(ValidationService.errorInField(this.editableUser.username));
    }

    closeModal() {
        this._activeModal.dismiss();
    }

    openSignUpModal() {
        this._activeModal.close();
    }

}
