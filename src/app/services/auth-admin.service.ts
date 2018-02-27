import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Globals} from "../statics/globals";
import {USERTYPE} from "../enums/enums";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthAdminService implements CanActivate {

    constructor(private _af:AngularFireAuth){

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (Globals.userInfo.securityLevel == USERTYPE.ADMINISTRATOR){
            return true;
        }else{
            this._af.auth.signOut();
            return false;
        }
    }
}
