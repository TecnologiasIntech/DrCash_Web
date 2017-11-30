import {Injectable} from '@angular/core';
import swal from 'sweetalert2'
import {promise} from "selenium-webdriver";
import {reject} from "q";

@Injectable()
export class alertService {

    constructor() {
    }

    error(title:string, message:string){
        swal(
            title,
            message,
            'error'
        )
    }
    infoTerms(title:string) {
       return new Promise((resolve =>{
           swal({
               title: title,
               type: 'info',
               html:
               ' <div style="height: 500px; overflow-y: auto">' +
               '<p>.kjbñjboho</p>' +
               '<p>.kjbñjboho</p>' +
               '<p>.kjbñjboho</p>' +
               '<p>.kjbñjboho</p>' +
               '<p>.kjbñjboho</p>' +
               '</div> '
               ,
               showCloseButton: true,
               confirmButtonText:
                   '<i class="fa fa-thumbs-up"></i> Acepto'
           }).then(function () {
               resolve();
           })
       }))
    }
    confirmError(title:string, message:string) {

        return new Promise((resolve => {

            swal({
                title: title,
                text: message,
                type: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            }).then(function () {
                resolve();
            })

        }))

    }

    confirmSuccess(title:string, message:string){
        return new Promise((resolve => {

            swal({
                title: title,
                text: message,
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            }).then(function () {
                resolve();
            })

        }))
    }

    showError(code:string){

        let title:string;
        let message:string;

        switch(code){

            case 'auth/invalid-email':
                title = "Email Invalido";
                message = "Ingresa un email valido 'ejemplo@ejemplo.com'";
                break;

            case 'auth/user-not-found':
                title = "Usuario no encontrado";
                message = "Introduzca un usuario que esté registrado en la aplicación";
                break;

        }

        this.error(title, message);

    }
}