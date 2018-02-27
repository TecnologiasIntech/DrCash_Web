import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from "angularfire2/auth";
import {UserService} from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _userService: UserService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this._userService.isAuthenticated()){

            return true;
        }else{
            return false;
        }.
    }
}
