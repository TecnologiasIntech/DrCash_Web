import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {ValidationService} from "../../services/validation.service";
import {Globals} from "../../statics/globals";
import {ERRORAUTH} from "../../enums/enums";
import {timeout} from "q";
import {LogService} from "../../services/log.service";
import {RouteService} from "../../services/route.service";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    // Declaracion de variables
    User: User[] = [];
    enableButton:boolean=true;
    errorPass: boolean = false;
    errorUserName: boolean = false;
    errorPassAndUsername: boolean = false;
    userNotFound: boolean = false;
    wrongPassword: boolean = false;

    // Referencias al DOM
    @ViewChild('username') private userRef: ElementRef;
    @ViewChild('password') private passRef: ElementRef;


    constructor(private activeModal: NgbActiveModal,
                private _usrService: UserService,
                private _logService:LogService,
                private _auth:AngularFireAuth) {


    }

    ngOnInit() {
        // RouteService.getParameterByName('email');
        let token = RouteService.getParameterByName('token');
        // var auth = this._auth.idToken.
        // debugger
    }



    errorInLoginFields(user: User) {
        this.changeBooleansUserAndErrorsInLogin();
        this.changeBooleansPasswordAndErrorsInLogin();
        if (ValidationService.errorInField(user.username) && ValidationService.errorInField(user.password)) {
            this.errorPassAndUsername = true;
        } else {
            if (ValidationService.errorInField(user.username)) {
                this.errorUserName = true;
                this.userRef.nativeElement.focus();
            } else {
                if (ValidationService.errorInField(user.password)) {
                    this.errorPass = true;
                    this.passRef.nativeElement.focus();
                }else{
                    this.userAuth(user);
                }
            }
        }
    }

    userAuth(user: User) {
        this._usrService.authUser(user).then((response:User) => {
            Globals.userInfo = response;
            this.setLog();
            this.activeModal.close(true);
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

    setLog(){
        //TODO Cambiar el numero de los register
        let message:string = Globals.userInfo.username+" made a login at te register 1";
        this._logService.setLog(message)
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
}
