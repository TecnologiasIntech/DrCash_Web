import { Injectable } from '@angular/core';
import {userAuthInterface} from "../interfaces/user.interface";
import {AngularFireDatabase} from "angularfire2/database";
import {alertService} from "./alert.service";
import {User} from "../interfaces/user";

@Injectable()
export class UserService {

  constructor(private db:AngularFireDatabase,
              private alertService:alertService) { }

  authUser(user:userAuthInterface){


     return new Promise((resolve,reject) => {

          this.db.object('users/' + user.username).subscribe((result: User) => {
           if(result.username!=null){
             resolve();
           }else{
             reject();
           }
         })
     })

  }

}
