import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../shared/services/shared.service";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import{Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent implements OnInit {
    messagesData: Array<any>;
    tasksData: Array<any>;
    maThemeModel: string = 'green';
    showMenu: boolean = false;


    constructor(private sharedService: SharedService,
                private afAuth: AngularFireAuth,
                private router:Router) {
    }

    setTheme() {
        this.sharedService.setTheme(this.maThemeModel)
    }

    ngOnInit() {
    }
}
