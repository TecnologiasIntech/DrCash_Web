import {Injectable} from '@angular/core';
import {alertService} from "./alert.service";

@Injectable()
export class ErrorsService {

    constructor(private _alertService:alertService) {
    }

    showErrorInCreateUser(errorCode:string){
        switch (errorCode){
            case 'auth/email-already-in-use':
                this._alertService.error('Este correo ya fue usado', '');
                break;

            case 'auth/invalid-email':
                this._alertService.error('Email invalido', 'Escriba un email valido');
                break;

            case 'auth/weak-password':
                this._alertService.error('Contraseña pobre', 'Escriba una contraseña más fuerte');
                break;
        }
    }

    showErrorInLogin(errorCode:string){
        switch (errorCode) {
            case 'auth/invalid-email':
                this._alertService.error('Email invalido', 'Escriba un email valido');
                break;

            case 'auth/user-disabled':
                this._alertService.error('Usuario deshabilitado', 'Consulte con un administrador para que habilite su cuenta');
                break;

            case 'auth/user-not-found':
                this._alertService.error('Usuario no fue encontrado', '');
                break;

            case 'auth/wrong-password':
                this._alertService.error('Contraseña incorrecta', '');
                break;
        }
    }

}
