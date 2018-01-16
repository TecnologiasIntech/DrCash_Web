import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../shared/services/shared.service";
import {Globals} from "../../../statics/globals";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AboutComponent} from "../../../modals/about/about.component";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
    selector: 'navigation-trigger',
    templateUrl: './navigation-trigger.component.html',
    styleUrls: ['./navigation-trigger.component.scss'],
})
export class NavigationTriggerComponent implements OnInit {
    // sidebarVisible: boolean;
    viewReportsOptions: boolean = false;
    viewSettingsOptions: boolean = false;
    path: string;


    constructor(private sharedService: SharedService,
                private _globals: Globals,
                private _modal: NgbModal,
                private _activatedRoute: ActivatedRoute,
                private route: Router) {
        this.route.events.subscribe(e => {
            this.path = this._activatedRoute.snapshot.children[0].routeConfig.path
        })
    }

    toggleSidebarVisibility() {
        this._globals.sidebarVisible = !this._globals.sidebarVisible;
    }

    openCloseNav() {
        // open
        if (this._globals.sidebarVisible == false) {
            document.getElementById("mySidenav").style.width = "250px";
        } else {
            // close
            document.getElementById("mySidenav").style.width = "0";
        }

    }


    sidenavAndClickIcon() {
        this.openCloseNav();
        this.toggleSidebarVisibility();
    }

    openAbout() {
        this._modal.open(AboutComponent, Globals.optionModalLg);
    }

    ngOnInit() {
    }
}
