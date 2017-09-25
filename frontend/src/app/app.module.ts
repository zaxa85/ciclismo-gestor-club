import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './directives/index';
import { NavbarComponent } from './directives/index';

import { AuthGuard } from './guards/index';
import { 
        AlertService, 
        AuthenticationService, 
        LoginService, 
        MemberService, 
        SponsorService, 
        UserService, 
        PaymentService,
        IncomeService,
        ExpenditureService } from './services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { MemberListComponent } from './member/index';
import { RegisterMemberComponent } from './member/index';
import { RegisterPaymentComponent } from './control/index';
import { RegisterSponsorComponent } from './sponsor/index';
import { RegisterIncomeComponent } from './control/index';
import { RegisterExpenditureComponent} from './control/index';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent, 
    ControlBalanceComponent, 
    ControlPaymentComponent, 
    RegisterMemberComponent, 
    RegisterPaymentComponent, 
    MemberListComponent,
    RegisterSponsorComponent,
    RegisterIncomeComponent,
    RegisterExpenditureComponent
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
    SponsorService,
    PaymentService,
    IncomeService,
    ExpenditureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
