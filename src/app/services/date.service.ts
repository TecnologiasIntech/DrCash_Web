import {Injectable} from '@angular/core';
import Global = NodeJS.Global;
import {Globals} from "../statics/globals";

@Injectable()
export class DateService {

    constructor() {

    }

    static getCurrentDate(): number {
        return this.getDateNumber()
    }

    static getDateNumber(): number {
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0" + (date.getMonth() + 1).toString()).slice(-2);
        dateNumber += ("0" + (date.getDate().toString())).slice(-2);
        dateNumber += ("0" + (date.getHours().toString())).slice(-2);
        dateNumber += ("0" + (date.getMinutes().toString())).slice(-2);
        dateNumber += ("0" + (date.getSeconds().toString())).slice(-2);

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

    static getDateLetterBy(beforeDate: string) {
        let year: number = parseInt(beforeDate.substr(0, 4));
        let month: number = parseInt(beforeDate.substr(4, 2)) - 1;
        let day: number = parseInt(beforeDate.substr(6, 2));

        let date = new Date(year, month, day);
        let dateLetter: string;
        dateLetter = date.toDateString();

        return dateLetter;
    }

    convertDateToDD_MM_YYYY_HH_MM(date: string) {
        let newDate: string = "";
        date = date.toString();
        newDate += date.substr(6, 2) + "/";
        newDate += date.substr(4, 2) + "/";
        newDate += date.substr(0, 4) + " ";
        newDate += date.substr(8, 2) + ":";
        newDate += date.substr(10, 2);

        return newDate;
    }

    getInitialCurrentDate() {
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0" + (date.getMonth() + 1).toString()).slice(-2);
        dateNumber += ("0" + (date.getDate().toString())).slice(-2);
        dateNumber += "000000"
        return parseInt(dateNumber);
    }

    getEndCurrentDate() {
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0" + (date.getMonth() + 1).toString()).slice(-2);
        dateNumber += ("0" + (date.getDate().toString())).slice(-2);
        dateNumber += "235959"
        return parseInt(dateNumber);
    }

    static getInitialCurrentDate() {
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0" + (date.getMonth() + 1).toString()).slice(-2);
        dateNumber += ("0" + (date.getDate().toString())).slice(-2);
        dateNumber += "000000";
        return parseInt(dateNumber);
    }

    static getEndCurrentDate() {
        let date = new Date();
        let dateNumber: string;
        dateNumber = date.getFullYear().toString();
        dateNumber += ("0" + (date.getMonth() + 1).toString()).slice(-2);
        dateNumber += ("0" + (date.getDate().toString())).slice(-2);
        dateNumber += "235959";
        return parseInt(dateNumber);
    }

    static getInitialDateByDatePicker(date: any) {
        let newDate: string = "";
        newDate += date.year;
        newDate += ("0" + date.month).slice(-2);
        newDate += ("0" + date.day).slice(-2);
        newDate += "000000";

        return newDate;
    }

    static getEndDateByDatePicker(date: any) {
        let newDate: string = "";
        newDate += date.year;
        newDate += ("0" + date.month).slice(-2);
        newDate += ("0" + date.day).slice(-2);
        newDate += "235959";

        return newDate;
    }

    static removeOneDayToDate(previusDate: string) {

        let year: number = parseInt(previusDate.substr(0, 4));
        let month: number = parseInt(previusDate.substr(4, 2)) - 1;
        let day: number = parseInt(previusDate.substr(6, 2));

        let date = new Date(year, month, day);
        date.setDate(date.getDate() - 1);

        let newDate: string = date.getFullYear().toString();
        newDate += ("0" + (date.getMonth() + 1).toString()).slice(-2);
        newDate += ("0" + (date.getDate().toString())).slice(-2);

        return newDate;
    }
}
