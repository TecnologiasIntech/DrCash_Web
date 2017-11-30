import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";

const ROUTES: Routes = [

    { path: '', loadChildren: './layout/layout.module#LayoutModule' },
    { path: 'login', component: LoginComponent },
    { path: 'contrasenia-olvidada', loadChildren: './pages/contrasenia-olvidada/contrasenia-olvidada.module#ContraseniaOlvidadaModule'},
    { path: 'auth' , loadChildren: './pages/auth/auth.module#AuthModule' }

];

export const routing = RouterModule.forRoot(ROUTES)

