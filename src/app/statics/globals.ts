import {Injectable} from "@angular/core";

@Injectable()
export class Globals {
    optionModalSm: object = {
        backdrop: "static",
        keyboard: false,
        size: "sm"
    };
    optionModalLg: object = {
        backdrop: "static",
        keyboard: false,
        size: "lg"
    };
}