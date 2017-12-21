import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {Globals} from "../../statics/globals";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {forEach} from "@angular/router/src/utils/collection";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {ValidationService} from "../../services/validation.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private _activeModal: NgbActiveModal,
              private _modal: NgbModal,
              private _usersService: UserService) { }

  ngOnInit() {
      this._usersService.getUsers().then(response=>{
        this.users = response;
        console.log(this.users);
      })
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

  sendUserToEdit(  _user: User){
    this.editableUser = _user;
    this.securityLevel = this.editableUser.securityLevel.toString();
    console.log(this.editableUser.securityLevel);
  }

    saveUser(){
    debugger;
        if(!this.areEmptyFields()){
            this._usersService.updateUser(this.editableUser);
            this.resetEditableUser();
        }
    }

    areEmptyFields(){
        if(ValidationService.errorInField(this.editableUser.firstName)){
            this.firstName.nativeElement.focus();
            return true;
        }else{
            if(ValidationService.errorInField(this.editableUser.lastName)){
                this.lastName.nativeElement.focus();
                return true;
            }else{
                if(ValidationService.errorInField(this.editableUser.email)){
                    this.email.nativeElement.focus();
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    resetEditableUser(){
        this.editableUser = {} as User;
    }

  closeModal(){
    this._activeModal.close();
  }

  openSignUpModal(){
      this._modal.open(SignUpComponent, Globals.optionModalLg);
  }

}
