import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

    constructor() {

    }
    
    static getCurrentDate(){
        return new Date().toString();
    }

    static getDateNumber():number {
        var date = new Date();
        date = date;
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0"+(date.getMonth()+1).toString()).slice(-2);
        dateNumber += ("0"+(date.getDate().toString())).slice(-2);
        dateNumber += date.getHours().toString();
        dateNumber += date.getMinutes().toString();
        dateNumber += date.getSeconds().toString();

        return parseInt(dateNumber);
    }

    static getDateLetter(): string {
        var date = new Date();
        date = date;
        let dateLetter: string;
        dateLetter = date.toDateString() + " ";
        dateLetter += date.getHours().toString() + ":";
        dateLetter += date.getMinutes().toString() + ":";
        dateLetter += date.getSeconds().toString();

        return dateLetter;
    }
    
}
