import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { SharedService } from "./shared/services/shared.service";

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {LoginComponent} from "./pages/login/login.component";
import {alertService} from "./services/alert.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        FormsModule,
        BrowserAnimationsModule,
        HttpModule,
        routing,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        AngularFireAuthModule


    ],
    providers: [
        SharedService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        alertService
    ],
    bootstrap: [AppComponent]
})



export class AppModule {
}
