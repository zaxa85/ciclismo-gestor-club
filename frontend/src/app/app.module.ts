import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './directives/index';
import { NavbarComponent } from './directives/index';
import { TopNavComponent } from './directives/index';
import { MenuListItemComponent } from './directives/index';

import { MediaMatcher } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';



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
  ExpenditureService,
  PeriodService,
  StorageService,
  NavService,
  SportEventService
} from './services/index';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { MemberListComponent } from './member/index';
import { RegisterMemberComponent } from './member/index';
import { RegisterPaymentComponent } from './control/index';
import { SponsorListComponent } from './sponsor/index';
import { SponsorRegisterComponent } from './sponsor/index';
import { RegisterIncomeComponent } from './control/index';
import { RegisterExpenditureComponent } from './control/index';
import { IncomeListComponent } from './control/index';
import { ExpenditureListComponent } from './control/index';
import { PaymentListComponent } from './control/index';
import { SportListComponent } from './sport/index';
import { SportEventComponent } from './sport/index';
import { SportTeamComponent } from './sport/index';

import { CustomErrorHandler } from './shared/index';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import {
  MatMenuModule, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatExpansionModule, MatFormFieldModule
} from '@angular/material';

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
    MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, MatExpansionModule, MatFormFieldModule,
    MatCardModule,
    MatInputModule
  ]
})

export class SharedMaterialModule { }


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    TopNavComponent,
    MenuListItemComponent,
    HomeComponent,
    LoginComponent,
    ControlBalanceComponent,
    ControlPaymentComponent,
    RegisterMemberComponent,
    RegisterPaymentComponent,
    MemberListComponent,
    SponsorListComponent,
    SponsorRegisterComponent,
    RegisterIncomeComponent,
    RegisterExpenditureComponent, IncomeListComponent, ExpenditureListComponent, PaymentListComponent,
    SportListComponent, SportEventComponent, SportTeamComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    routing,
    FlexLayoutModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    NavService,
    MemberService,
    UserService,
    SponsorService,
    PaymentService,
    IncomeService,
    ExpenditureService,
    PeriodService,
    MediaMatcher,
    StorageService,
    { provide: ErrorHandler, useClass: CustomErrorHandler } // overrride default error handler
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
