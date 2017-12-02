import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {alertService} from '../../services/alert.service'
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import{userAuthInterface} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    // Declaracion de variables
    User:User[]=[];
    errorsInLogin: boolean = false;
    errorPass: boolean = false;
    errorUserName: boolean = false;

    // Referencias al DOM
    @ViewChild('username') private userRef: ElementRef;
    @ViewChild('password') private passRef: ElementRef;


    constructor(private _alertService: alertService,
                private activeModal: NgbActiveModal,
                private _usrService:UserService) {


    }

    ngOnInit() {
    }


    errorInLoginFields(user: User) {
        if (user.username == null || user.username=="") {
            this.errorUserName = true;
            this.errorsInLogin = true;
            this.userRef.nativeElement.focus();
        }
        if (user.password == null || user.password=="") {
            this.errorPass = true;
            this.errorsInLogin = true;
            this.passRef.nativeElement.focus();

        }

        if(!this.errorsInLogin){
            this.userAuthentification(user);
        }
    }

    userAuthentification(user:User){
        this._usrService.authUser(user).then((response)=>{
            this.activeModal.dismiss();
        }).catch((reject)=>{
            this._alertService.error("User Not Found","Try Again");
            user.username = null;
            user.password = null;

        })
    }

    closeApp(){
        window.close();
    }

    changeBooleansUserAndErrorsInLogin(){
        this.errorsInLogin = false;
        this.errorUserName=false;
    }
    changeBooleansPasswordAndErrorsInLogin(){
        this.errorsInLogin = false;
        this.errorPass=false;
    }


}
