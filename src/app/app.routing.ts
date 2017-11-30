import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modals/login/login.component";

const ROUTES: Routes = [

    { path: '', loadChildren: './layout/layout.module#LayoutModule' }
];

export const routing = RouterModule.forRoot(ROUTES)

