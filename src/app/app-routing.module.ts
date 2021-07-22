import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {BackgroundComponent} from './background/background.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import {RegisterComponent} from './register/register.component';
import {StatusComponent} from './status/status.component';
import {AdminComponent} from './admin/admin.component';
import {AuthService} from './auth.service';
import {AngularFireAuthGuardModule, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);
const redirectLoggedInToReg = () => redirectLoggedInTo(['register']);

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'status', component: StatusComponent, canActivate: [AngularFireAuthGuardModule], data: { authGuardPipe: redirectLoggedInToReg() }},
  {path: 'background', component: BackgroundComponent},
  {path: 'callback', component: OktaCallbackComponent},
  {path: 'admin', component: AdminComponent},

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
