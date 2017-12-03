import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";
import {User} from "../interfaces/user";

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
                        reject("Wrong Password");
                    }
                    // this._globals.userInfo = result;

                } else {
                    reject("User Not Found");
                }
            })
        })
    }
}
