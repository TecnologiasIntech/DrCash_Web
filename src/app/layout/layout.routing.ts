import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {LoginComponent} from "../pages/login/login.component";
import {HomeComponent} from "../pages/home/home.component";

const LAYOUT_ROUTES: Routes = [
    {
        path: '', component: LayoutComponent, children: [
        //Home
        {path: '', redirectTo: 'principal', pathMatch: 'full'},
        {path: 'principal', component: HomeComponent},

    ]
    }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
