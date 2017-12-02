import {Injectable} from '@angular/core';
import {userAuthInterface} from "../interfaces/user.interface";
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";
import {User} from "../interfaces/user";
import {Globals} from "../statics/globals";
// import {_global} from "@angular/core/src/util";

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private alertService: alertService) {
    }

    authUser(user: User) {
        return new Promise((resolve, reject) => {
            this.db.object('users/' + user.username).subscribe((result: User) => {
                if (result.username != null) {
                    if(result.password==user.password){
                        resolve();
                    }else{
                        reject();
                    }
                    // this._globals.userInfo = result;

                } else {
                    reject();
                }
            })
        })
    }
}
