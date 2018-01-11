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
            let email = user.email.replace(/[^a-zA-Z 0-9.]+/g,'');
            email = email.replace('.','');
            this.db.object('users/' + email).valueChanges().subscribe((result: User) => {
                if (user.email != null) {
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

    getUser(emai: string) {
        return new Promise(resolve => {
            this.db.object('users/' + emai).valueChanges().subscribe((result: User) => {
                resolve(result);
            })
        })
    }

    updateUser(user: User) {
        let email = user.email.replace(/[^a-zA-Z 0-9.]+/g,'');
        email = email.replace('.','');
        this.db.object('users/' + email).update(user);
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

    updatePassword(newPassword: string) {
        this._af.auth.currentUser.updatePassword(newPassword)
            .catch((error) => {
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

    getUserID() {
        return new Promise(resolve => {
            this.db.object('users/numberUsers').valueChanges().take(1).subscribe((snapshot: number) => {
                resolve(snapshot + 1)
            })
        })
    }

    createNewUser(email: string, pass: string) {
        return new Promise((resolve, reject) => {
            this._af.auth.createUserWithEmailAndPassword(email, pass)
                .then(response => {
                    this._af.auth.signInWithEmailAndPassword(Globals.userInfo.email, Globals.userInfo.password)
                        .then(()=>{
                            resolve();
                        })
                        .catch(error => {
                            reject(error);
                            console.log("Error Sign In :");
                            console.log(error);
                        })
                })
                .catch(error => {
                    reject(error);
                    console.log("Error Create User :");
                    console.log(error);
                })
        })

    }
}