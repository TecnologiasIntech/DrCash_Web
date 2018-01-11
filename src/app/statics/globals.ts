import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";
import {Setting} from "../interfaces/setting";

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
    sidebarVisible: boolean = false;
    static userInfo: User;

    static settings: Setting;

    static afk: boolean = false;

    static securityQuestions: string[] = [
        "What was your childhood nickname?",
        "What school did you attend for sixth grade?",
        "In what town was your firs job?",
        "Where does your youngest brother birthday?",
        "What is your maternal grandmother maiden name?",
        "What street did you live on in third grade?",
    ]
}