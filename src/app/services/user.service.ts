import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";
import {User} from "../interfaces/user";
import {ERRORAUTH} from "../enums/enums";
import {Globals} from "../statics/globals";
import {DateService} from "./date.service";
import {reject} from "q";
import {ValidationService} from "./validation.service";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private alertService: alertService,
                private _af: AngularFireAuth) {
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

    getUser(emai:string){
        return new Promise(resolve => {
            this.db.object('users/' + emai).valueChanges().subscribe((result: User) => {
                resolve(result);
            })
        })
    }

    updateUser(user: User) {
        this.db.object('users/' + user.username).update(user);
        this.db.object("users/").update({
            numberUsers: user.userId
        });
    }

    getUsersByMyClinic() {
        return new Promise(resolve => {
            this.db.list('users', ref => ref
                .orderByChild("clinic")
                .equalTo(Globals.userInfo.clinic)
            ).valueChanges().take(1)
                .subscribe(snapshot => {
                    resolve(snapshot);
                })
        })
    }

    updatePassword(newPassword:string){
        this._af.auth.currentUser.updatePassword(newPassword)
            .catch((error)=>{
                console.log("Error to change Password: " + error);
            })
    }

    getAllUsers() {
        return new Promise(resolve => {
            this.db.list('users').valueChanges().take(1).subscribe(snapshot => {
                resolve(snapshot);
            })
        })
    }

    setUser(user: User) {
        this.db.object('users/' + user.username).set(user);
    }

    existUser(username: string) {
        return new Promise(resolve => {
            this.db.list('users/' + username).valueChanges().take(1).subscribe(snapshot => {
                if (snapshot.length > 0) {
                    resolve(true)
                } else {
                    resolve(false);
                }
            })
        })
    }

    getUserID(){
        debugger
        return new Promise(resolve=>{
            this.db.object('users/numberUsers').valueChanges().take(1).subscribe((snapshot:number)=>{
                resolve(snapshot+1)
            })
        })
    }
}