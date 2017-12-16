import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../interfaces/user";
import {Globals} from "../../statics/globals";
import {ERRORAUTH} from "../../enums/enums";
import {UserService} from "../../services/user.service";
import {ValidationService} from "../../services/validation.service";
import {RefundComponent} from "../refund/refund.component";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
    // Declaracion de variables
    User: User[]=[];
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
                private _modalService:NgbModal) {
    }

    ngOnInit() {
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

    closeModal() {
        this.activeModal.close(false);
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
