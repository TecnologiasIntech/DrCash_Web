import {Component, OnInit} from '@angular/core';
import {isUndefined} from "util";

@Component({
    selector: 'app-cash-out',
    templateUrl: './cash-out.component.html',
    styleUrls: ['./cash-out.component.scss']
})
export class CashOutComponent implements OnInit {

    Bills100: number = 0;
    Bills50: number = 0;
    Bills20: number = 0;
    Bills10: number = 0;
    Bills5: number = 0;
    Bills1: number = 0;
    totalCash: number = 0;

    constructor() {
    }

    ngOnInit() {
    }

    incrementBills100() {
        this.Bills100++;
        this.totalCash += 100;
    }

    decrementBills100() {

        if (this.Bills100 == 0) {
            this.Bills100 = 0;
        } else {
            this.Bills100--;
            if (this.totalCash == 0) {
                this.totalCash = 0;
            } else {
                this.totalCash -= 100;
            }
        }
    }

    incrementBills50() {
        this.Bills50++;
        this.totalCash += 50;

    }

    decrementBills50() {

        if (this.Bills50 == 0) {
            this.Bills50 = 0;
        } else {
            this.Bills50--;
            if (this.totalCash == 0) {
                this.totalCash = 0;
            } else {
                this.totalCash -= 50;
            }
        }
    }

    incrementBills20() {

        this.Bills20++;
        this.totalCash += 20;

    }

    decrementBills20() {

        if (this.Bills20 == 0) {
            this.Bills20 = 0;
        } else {
            this.Bills20--;
            if (this.totalCash == 0) {
                this.totalCash = 0;
            } else {
                this.totalCash -= 20;
            }
        }
    }

    incrementBills10() {

        this.Bills10++;
        this.totalCash += 10;

    }

    decrementBills10() {

        if (this.Bills10 == 0) {
            this.Bills10 = 0;
        } else {
            this.Bills10--;
            if (this.totalCash == 0) {
                this.totalCash = 0;
            } else {
                this.totalCash -= 10;
            }
        }
    }

    incrementBills5() {

        this.Bills5++;
        this.totalCash += 5;

    }

    decrementBills5() {

        if (this.Bills5 == 0) {
            this.Bills5 = 0;
        } else {
            this.Bills5--;
            if (this.totalCash == 0) {
                this.totalCash = 0;
            } else {
                this.totalCash -= 5;
            }
        }
    }

    incrementBills1() {

        this.Bills1++;
        this.totalCash += 1;

    }

    decrementBills1() {

        if (this.Bills1 == 0) {
            this.Bills1 = 0;
        } else {
            this.Bills1--;
            if (this.totalCash == 0) {
                this.totalCash = 0;
            } else {
                this.totalCash -= 1;
            }
        }
    }

    cleanFields(){
        this.Bills100=0;
        this.Bills50=0;
        this.Bills20=0;
        this.Bills10=0;
        this.Bills5=0;
        this.Bills1=0;
    }


}
