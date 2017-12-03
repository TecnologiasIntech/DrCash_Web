import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
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
    errorPassAndUsername:boolean=false;
    userNotFound:boolean=false;
    wrongPassword:boolean=false;

    // Referencias al DOM
    @ViewChild('username') private userRef: ElementRef;
    @ViewChild('password') private passRef: ElementRef;


    constructor(private activeModal: NgbActiveModal,
                private _usrService:UserService) {


    }

    ngOnInit() {
    }


    errorInLoginFields(user: User) {
        debugger
        if((user.username==null && user.password==null)||(user.username=="" && user.password=="") ){
            this.errorPassAndUsername=true;
            this.errorsInLogin=true;
        }else{
            if (user.username == null || user.username == "") {
                this.errorUserName = true;
                this.errorsInLogin = true;
                this.userRef.nativeElement.focus();
            }
            if (user.password == null || user.password == "") {
                this.errorPass = true;
                this.errorsInLogin = true;
                this.passRef.nativeElement.focus();

            }
        }

        if(!this.errorsInLogin || !this.errorPassAndUsername){
            this.userAuthentification(user);
        }
    }

    userAuthentification(user:User){
        this._usrService.authUser(user).then((response)=>{
            this.activeModal.dismiss();
        }).catch((reject:any)=>{
            // this._alertService.error(reject,"Try Again");
            if(reject == "User Not Found"){
                user.username = null;
                user.password = null;
                this.userNotFound=true;
            }else{
                user.password = null;
                this.wrongPassword=true;
            }
        })
    }

    closeApp(){
        window.close();
    }

    changeBooleansUserAndErrorsInLogin(){
        this.errorsInLogin = false;
        this.errorUserName=false;
        this.errorPassAndUsername=false;
        this.userNotFound=false;
    }
    changeBooleansPasswordAndErrorsInLogin(){
        this.errorsInLogin = false;
        this.errorPass=false;
        this.errorPassAndUsername=false;
        this.wrongPassword=false;
    }
}
