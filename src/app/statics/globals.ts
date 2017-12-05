import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";

@Injectable()
export class Globals {
    static optionModalSm: object = {
        backdrop: "static",
        keyboard: false,
        size: "sm"
    };
    static optionModalLg: object = {
        backdrop: "static",
        keyboard: false,
        size: "lg"
    };
    static userInfo: User = {
        username: "carlos",
        firstName: "carlos",
        lastName: "alatorre",
        password: "carlos",
        securityQuestion: "asd",
        securityAnswer: "asd",
        securityLevel: 2,
        activeAccount: true,
        passwordReset: false,
        createdBy: 2,
        creationDate: "asd",
        userId: 1,
        clinic: 0
    }
     sidebarVisible:boolean=false;

}