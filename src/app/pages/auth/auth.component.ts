import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {userAuthInterface} from "../../interfaces/user.interface";
import {alertService} from '../../services/alert.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    view: string;
    errorPass: boolean = false;
    errorVerifyPass: boolean = false;
    showError: boolean = false;
    closeError: boolean = false;
    isLoading: boolean = false;
    errorInVerifyEmail:boolean=true;

    animatedIcon: boolean = true;
    userInfoBasic: any;
    user: userAuthInterface[] = [];

    @ViewChild('pass') private passRef: ElementRef;
    @ViewChild('verifyPass') private verifyPassRef: ElementRef;

    constructor(private afAuth: AngularFireAuth,
                private alertService: alertService) {

        this.view = this.getParameterByName("mode");
        if (this.view == "verifyEmail") {
            this.verifyEmail();
        }

        setInterval(() => {
            this.animatedIcon = !this.animatedIcon;
        }, 2000);
        afAuth.auth.onAuthStateChanged((user) => {
            // console.log(user)
            this.userInfoBasic = user;
        });
    }

    ngOnInit() {
    }


    verifyEmail() {
        // this.afAuth.auth.applyActionCode(code);
        this.afAuth.auth.applyActionCode(this.getParameterByName("oobCode"))
            .then(response => {
                this.errorInVerifyEmail=false;
                this.view = this.getParameterByName("mode");
            }).catch((error: any) => {
                this.errorInVerifyEmail=true;
                this.view="errorCodeEmail";
            this.getFirebaseErrors(error.code);
        })
    }

    getFirebaseErrors(error: string) {
        switch (error) {
            case 'auth/expired-action-code':
                this.alertService.confirmError("Oooops!, huston we have a problem!", "Este enlace ya ha sido utilizado");
                break;

            case 'auth/invalid-action-code':
                this.alertService.confirmError("Enlace invalido", "Este enlace no existe, intente con otro");
                break;

            case 'auth/user-disabled':
                this.alertService.confirmError("Usuario deshabilitado", "Tu usuario ha sido bloqueado por " +
                    "alguna razon contacta al administrador",);
                break;

            case 'auth/user-not-found':
                this.alertService.confirmError("Usuario no encontrado", "No pudimos enviarte el codigo de verificacion" +
                    " debido a que no encontramos tu usuario");
                break;
        }

    }

    getParameterByName(name: string) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.hash);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

    }

    restorePass(user: userAuthInterface) {
        if (!this.errorInRestorePassword(user)) {
            this.isLoading = true;
            this.afAuth.auth.confirmPasswordReset(this.getParameterByName("oobCode"), user.pass)
                .then(response => {

                    this.alertService.confirmSuccess("Contraseña restablecida", "Inicie sesion para ingresar a la app")
                        .then(() => {
                            window.location.href = '#/login';
                        })

                }).catch((error: any) => {
                this.getFirebaseErrors(error.code);
                this.isLoading = false;
            })

        }
    }

    errorInRestorePassword(user: userAuthInterface) {
        let errors: boolean = false;

        // verificacion de contraseña vacia
        if (user.pass == "" || user.pass == null) {
            this.passRef.nativeElement.focus();
            this.errorPass = true;
            this.sendError();
            errors = true;
        }

        // verificacion de contraseñas iguales
        if (user.pass != user.passVerify) {
            this.verifyPassRef.nativeElement.focus();
            this.errorVerifyPass = true;
            errors = true;
            this.sendError();

        }

        // verificacion de repetir contraseña vacia
        if (user.passVerify == "" || user.passVerify == null) {
            this.verifyPassRef.nativeElement.focus();
            this.errorVerifyPass = true;
            this.sendError();
            errors = true;
        }


        return errors;
    }

    sendError() {
        this.showError = true;
        this.closeError = false;
        setTimeout(() => {
            this.closeError = true;
            setTimeout(() => {
                this.showError = false;
            }, 1000);
        }, 2000);
    }


}
