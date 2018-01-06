import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../../shared/services/shared.service";
import {Globals} from "../../../statics/globals";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AboutComponent} from "../../../modals/about/about.component";

@Component({
    selector: 'navigation-trigger',
    templateUrl: './navigation-trigger.component.html',
    styleUrls: ['./navigation-trigger.component.scss'],
})
export class NavigationTriggerComponent implements OnInit {
    // sidebarVisible: boolean;
    viewReportsOptions: boolean=false;
    viewSettingsOptions: boolean=false;
    constructor(private sharedService: SharedService,
                private _globals: Globals,
                private _modal:NgbModal) {
        // sharedService.sidebarVisibilitySubject.subscribe((value) => {
        //
        //     this.sidebarVisible = value
        // })
    }

    toggleSidebarVisibility() {
        this._globals.sidebarVisible=!this._globals.sidebarVisible;
    }

    openCloseNav(){
        // open
        if (this._globals.sidebarVisible==false){
            document.getElementById("mySidenav").style.width="250px";
        }else {
            // close
            document.getElementById("mySidenav").style.width="0";
        }

    }


    sidenavAndClickIcon(){
        this.openCloseNav();
        this.toggleSidebarVisibility();
    }

    openAbout(){
        this._modal.open(AboutComponent, Globals.optionModalLg);
    }

    ngOnInit() {

    }
}
