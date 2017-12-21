import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";
import {User} from "../interfaces/user";
import {ERRORAUTH} from "../enums/enums";
import {Globals} from "../statics/globals";

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private alertService: alertService) {
    }

    authUser(user: User) {
        return new Promise((resolve, reject) => {
            this.db.object('users/' + user.username).valueChanges().subscribe((result: User) => {
                if (result.username != null) {
                    if (result.password == user.password) {
                        resolve(result);

                    } else {
                        reject(ERRORAUTH.WRONGPASSWORD);
                    }
                } else {
                    reject(ERRORAUTH.USERNOTFOUND);
                }
            })
        })
    }

    updateUser(user: User) {
        this.db.object('users/' + user.username).update(user);
    }

    getUsersByMyClinic(){
        return new Promise(resolve=>{
            this.db.list('users', ref => ref
                .orderByChild("clinic")
                .equalTo(Globals.userInfo.clinic)
            ).valueChanges().take(1)
                .subscribe(snapshot=>{
                    resolve(snapshot);
                })
        })
    }

    getAllUsers() {
        return new Promise(resolve => {
            this.db.list('users').valueChanges().take(1).subscribe(snapshot => {
                resolve(snapshot);
            })
        })
    }
}
