import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { AlertService, AuthenticationService, LoginService, MemberService, SponsorService, UserService } from './services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { MemberListComponent } from './member/index';
import { RegisterMemberComponent } from './member/index';
import { RegisterSponsorComponent } from './sponsor/index';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent, 
    ControlBalanceComponent, 
    ControlPaymentComponent, 
    RegisterMemberComponent, 
    MemberListComponent,
    RegisterSponsorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    MemberService,
    UserService,
    SponsorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
