import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { alertService } from '../../services/alert.service';
import {isLoop} from "tslint";

@Component({
    selector: 'app-contrasenia-olvidada',
    templateUrl: './contrasenia-olvidada.component.html',
    styleUrls: ['./contrasenia-olvidada.component.scss']
})
export class ContraseniaOlvidadaComponent implements OnInit {

    userEmail: string = "";
    errorEmail: boolean = false;
    error:boolean = false;
    closeError: boolean = false;
    isLoading:boolean = false;

    @ViewChild('email') private emailRef: ElementRef;

    constructor(private afAuth: AngularFireAuth,
                private  alertService: alertService) {
    }

    ngOnInit() {
    }

    sendEmailVerification(email: string) {
        if(!this.errorInEmailField(email)) {
            this.isLoading = true;
            this.afAuth.auth.sendPasswordResetEmail(email, null).then((response:any)=>{

                this.alertService.confirmSuccess("Codigo enviado correctamente", "Revise su correo electronico")
                this.isLoading = false;
            }).catch((error:any)=>{

                this.alertService.showError(error.code);
                this.isLoading = false;

            })
        }
    }

    errorInEmailField(email: string) {

        let error: boolean = false;

        let patronEmail = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
        if (email == "" || email == null || !patronEmail.test(email)) {
            this.errorEmail = true;
            this.emailRef.nativeElement.focus();
            error = true;
            this.showError();
        }

        return error;
    }

    showError() {
        this.error = true;
        this.closeError = false;
        setTimeout(() => {
            this.closeError = true;
            setTimeout(() => {
                this.error = false;
            }, 1000);
        }, 2000);
    }

}
