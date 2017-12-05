import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

    validateArrows(e) {

        let input;
        e = e || window.event;

        if (e.code == 'ArrowDown') {
            // up arrow
            return false;
        }
        else if (e.code == 'ArrowUp') {
            // down arrow
            return false;

        }
        else if (e.code == 'ArrowLeft') {
            // left arrow
            return false;
        }
        else if (e.code == 'ArrowRigth') {
            // right arrow
            return false;
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input)

    }

    restrictNumeric(e) {


        let input;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }

        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input)
    }

}
