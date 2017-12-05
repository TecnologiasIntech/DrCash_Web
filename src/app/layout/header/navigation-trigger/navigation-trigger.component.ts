import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../../shared/services/shared.service";
import {Globals} from "../../../statics/globals";

@Component({
    selector: 'navigation-trigger',
    templateUrl: './navigation-trigger.component.html',
    styleUrls: ['./navigation-trigger.component.scss'],
})
export class NavigationTriggerComponent implements OnInit {
    // sidebarVisible: boolean;
    viewReportsOptions: boolean=false;
    constructor(private sharedService: SharedService,
                private _globals: Globals) {
        // sharedService.sidebarVisibilitySubject.subscribe((value) => {
        //
        //     this.sidebarVisible = value
        // })
    }

    toggleSidebarVisibility() {
        this._globals.sidebarVisible=!this._globals.sidebarVisible;
    }

    openCloseNav(){
        if (this._globals.sidebarVisible==false){
            document.getElementById("mySidenav").style.width="250px";
        }else {
            document.getElementById("mySidenav").style.width="0";
        }

    }

    ngOnInit() {

    }
}
