import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {ValidationService} from "../../services/validation.service";
import {Globals} from "../../statics/globals";
import {ERRORAUTH} from "../../enums/enums";

@Component({
    selector: 'app-credentials',
    templateUrl: './credentials.component.html',
    styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

// Declaracion de variables
    User: User[] = [];
    enableButton: boolean = true;
    errorPass: boolean = false;
    errorUserName: boolean = false;
    errorPassAndUsername: boolean = false;
    userNotFound: boolean = false;
    wrongPassword: boolean = false;

    // Referencias al DOM
    @ViewChild('username') private userRef: ElementRef;
    @ViewChild('password') private passRef: ElementRef;

    usernameInput: string = Globals.userInfo.username;

    constructor(private activeModal: NgbActiveModal,
                private _usrService: UserService) {

        Globals.afk = true;


    }

    ngOnInit() {

    }


    errorInLoginFields(user: User) {
        this.changeBooleansUserAndErrorsInLogin();
        this.changeBooleansPasswordAndErrorsInLogin();
        if (ValidationService.errorInField(user.password)) {
            this.errorPass = true;
            this.passRef.nativeElement.focus();
        } else {
            user.username = this.usernameInput;
            this.userAuth(user);
        }
    }

    userAuth(user: User) {
        this._usrService.authUser(user).then((response: User) => {
            Globals.userInfo = response;
            Globals.afk = false;
            this.activeModal.close();
        }).catch((reject: any) => {
            // this._alertService.error(reject,"Try Again");
            if (reject == ERRORAUTH.USERNOTFOUND) {
                this.userNotFound = true;
                this.userRef.nativeElement.focus();
            } else {
                user.password = null;
                this.wrongPassword = true;
                this.passRef.nativeElement.focus();
            }
        })
    }

    closeApp() {
        window.close();
    }

    changeBooleansUserAndErrorsInLogin() {
        this.errorUserName = false;
        this.errorPassAndUsername = false;
        this.userNotFound = false;
    }

    changeBooleansPasswordAndErrorsInLogin() {
        this.errorPass = false;
        this.errorPassAndUsername = false;
        this.wrongPassword = false;
    }

    closeError(error: boolean, errorAuth: any) {
        debugger
        setTimeout(() => {
            this.enableButton = true;
            // switch (errorAuth){
            //     case ENUMS.PASSANDUSERNAME:
            //         //code
            //         break;
            //
            // }
        }, 1000)
    }
}
