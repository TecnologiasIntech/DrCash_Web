import {Injectable} from '@angular/core';
import {isUndefined} from "util";

@Injectable()
export class ValidationService {

    constructor() {
    }

    static errorInField(field: any) {
        return isUndefined(field) || field == null || field == "";
    }
}
