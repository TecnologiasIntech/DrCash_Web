import {Injectable} from '@angular/core';
import {userAuthInterface} from "../interfaces/user.interface";
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";
import {User} from "../interfaces/user";
import {Globals} from "../statics/globals";

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private alertService: alertService,
                private _globals: Globals) {
    }

    authUser(user: userAuthInterface) {
        return new Promise((resolve, reject) => {
            this.db.object('users/' + user.username).subscribe((result: User) => {
                if (result.username != null) {
                    Globals.userInfo = result;
                    resolve();
                } else {
                    reject();
                }
            })
        })
    }
}
