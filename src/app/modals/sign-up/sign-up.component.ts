import {Component, OnInit} from '@angular/core';
import {Globals} from "../../statics/globals";
import {DateService} from "../../services/date.service";
import {User} from "../../interfaces/user";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    newUser:User;

    constructor() {
    }

    ngOnInit() {
    }

    loadUserDefaultData(){
        // TODO: Verificar si es de utilidad el userID y si no entonces eliminarlo
        this.newUser.activeAccount = true;
        this.newUser.passwordReset = true;
        this.newUser.modifiedBy = Globals.userInfo.userId;
        this.newUser.modificationDate = DateService.getCurrentDate().toString();
        this.newUser.createdBy = Globals.userInfo.userId;
        this.newUser.creationDate = this.newUser.modificationDate;
    }
}
