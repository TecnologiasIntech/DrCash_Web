import {Component, OnInit} from '@angular/core';
import {RouteService} from "../../services/route.service";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Globals} from "../../statics/globals";
import {User} from "../../interfaces/user";
import {SettingService} from "../../services/setting.service";
import {Setting} from "../../interfaces/setting";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(private _af: AngularFireAuth,
                private _router: Router,
                private _userService: UserService,
                private _settingsService:SettingService) {
        this.authUser();
    }

    ngOnInit() {
    }

    authUser() {
        let email = RouteService.getParameterByName("email");
        let pass = RouteService.getParameterByName("pass");

        this._af.auth.signInWithEmailAndPassword(email, pass).then(() => {
            email = email.replace(/[^a-zA-Z 0-9.]+/g,'');
            email = email.replace('.','');
            this._userService.getUser(email)
                .then((response: User) => {
                    Globals.userInfo = response;
                    this._settingsService.getSettings()
                        .then((response: Setting) => {
                            Globals.settings = response;
                        })
                    this._router.navigate(['home']);
                });
        })
    }

}
