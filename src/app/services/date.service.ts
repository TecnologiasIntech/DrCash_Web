import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

    constructor() {

    }
    
    static getCurrentDate(){
        return new Date().toString();
    }
}
