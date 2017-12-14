import {Injectable} from '@angular/core';
import Global = NodeJS.Global;
import {Globals} from "../statics/globals";

@Injectable()
export class DateService {

    constructor() {
    }

    static getCurrentDate():number{
        return this.getDateNumber()
    }

    static getDateNumber():number {
        let date = new Date();
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
        let date = new Date();
        let dateLetter: string;
        dateLetter = date.toDateString() + " ";
        dateLetter += date.getHours().toString() + ":";
        dateLetter += date.getMinutes().toString() + ":";
        dateLetter += date.getSeconds().toString();

        return dateLetter;
    }
    
    static getInitialCurrentDate(){
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0"+(date.getMonth()+1).toString()).slice(-2);
        dateNumber += ("0"+(date.getDate().toString())).slice(-2);
        dateNumber += "000000"+Globals.userInfo.userId;
        return parseInt(dateNumber);
    }

    static  getEndCurrentDate(){
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0"+(date.getMonth()+1).toString()).slice(-2);
        dateNumber += ("0"+(date.getDate().toString())).slice(-2);
        dateNumber += "235959"+Globals.userInfo.userId;
        return parseInt(dateNumber);
    }
}
