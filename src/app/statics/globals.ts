import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";

@Injectable()
export class Globals {
    optionModalSm: object = {
        backdrop: "static",
        keyboard: false,
        size: "sm"
    };
    static optionModalLg: object = {
        backdrop: "static",
        keyboard: false,
        size: "lg"
    };
    static userInfo:User;
}