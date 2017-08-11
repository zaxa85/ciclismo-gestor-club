import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { LoginComponent } from './login/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { RegisterMemberComponent } from './member/index';
import { RegisterSponsorComponent } from './sponsor/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    ControlBalanceComponent, 
    ControlPaymentComponent, 
    RegisterMemberComponent, 
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
    UserService
    MemberService
    SponsorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
