import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { BackgroundComponent } from './background/background.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { library } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faFilm, faFish, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { StatusComponent } from './status/status.component';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {CommonModule} from '@angular/common';
import { NewComponentComponent } from './new-component/new-component.component';
import { AdminComponent } from './admin/admin.component';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    BackgroundComponent,
    RegisterComponent,
    StatusComponent,
    NewComponentComponent,
    AdminComponent
  ],
  imports: [
    // AngularFireAuthModule, // Only required for auth features,
    AngularFirestoreModule,
    BrowserModule,
    FontAwesomeModule,
    AngularFireAuthGuardModule,
    AngularFireModule.initializeApp(environment.firebase, 'mytestapp'),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faFilm, faFish, faEnvelope);
  }
}
