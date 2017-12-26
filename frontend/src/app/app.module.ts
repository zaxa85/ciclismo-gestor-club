import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './directives/index';
import { NavbarComponent } from './directives/index';
import { SidebarComponent } from './directives/index';
import {MediaMatcher} from '@angular/cdk/layout';



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
  ExpenditureService
} from './services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { MemberListComponent } from './member/index';
import { RegisterMemberComponent } from './member/index';
import { RegisterPaymentComponent } from './control/index';
import { RegisterSponsorComponent } from './sponsor/index';
import { RegisterIncomeComponent } from './control/index';
import { RegisterExpenditureComponent } from './control/index';

import { MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatListModule } from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  exports: [
    // CDk
    CdkTableModule,
    OverlayModule,
    // Material
    MatMenuModule,
    MatButtonModule,
    MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule
  ]
})

export class SharedMaterialModule  { }


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
    RegisterExpenditureComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
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
    ExpenditureService,
    MediaMatcher
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
