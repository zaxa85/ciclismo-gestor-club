import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { RegisterMemberComponent } from './member/index';
import { MemberListComponent } from './member/index';
import { SponsorListComponent } from './sponsor/index';
import { SponsorRegisterComponent } from './sponsor/index';
import { RegisterPaymentComponent } from './control/index';
import { RegisterIncomeComponent } from './control/index';
import { RegisterExpenditureComponent } from './control/index';
import { IncomeListComponent } from './control/index';
import { ExpenditureListComponent } from './control/index';
import { PaymentListComponent } from './control/index';
import { SportListComponent } from './sport/index';
import { SportEventComponent } from './sport/index';
import { SportTeamComponent } from './sport/index';

import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'control.balance', component: ControlBalanceComponent, canActivate: [AuthGuard] },
    { path: 'control.payment', component: ControlPaymentComponent, canActivate: [AuthGuard] },
    { path: 'control.register.payment', component: RegisterPaymentComponent, canActivate: [AuthGuard] },
    {
        path: 'control.register.payment/:id',
        canActivate: [AuthGuard],
        component: RegisterPaymentComponent
    },
    { path: 'member.register', component: RegisterMemberComponent, canActivate: [AuthGuard] },
    {
        path: 'member.register/:id',
        canActivate: [AuthGuard],
        component: RegisterMemberComponent
    },
    { path: 'member.list', component: MemberListComponent, canActivate: [AuthGuard] },
    { path: 'sponsor.list', component: SponsorListComponent, canActivate: [AuthGuard] },
    { path: 'sponsor.register', component: SponsorRegisterComponent, canActivate: [AuthGuard] },
    {
        path: 'sponsor.register/:id',
        canActivate: [AuthGuard],
        component: SponsorRegisterComponent
    },
    { path: 'income.register', component: RegisterIncomeComponent, canActivate: [AuthGuard] },
    {
        path: 'income.register/:id',
        canActivate: [AuthGuard],
        component: RegisterIncomeComponent
    },
    { path: 'income.list', component: IncomeListComponent, canActivate: [AuthGuard] },
    { path: 'expenditure.register', component: RegisterExpenditureComponent, canActivate: [AuthGuard] },
    {
        path: 'expenditure.register/:id',
        canActivate: [AuthGuard],
        component: RegisterExpenditureComponent
    },
    { path: 'expenditure.list', component: ExpenditureListComponent, canActivate: [AuthGuard] },
    { path: 'payment.list', component: PaymentListComponent, canActivate: [AuthGuard] },

    { path: 'sport.list', component: SportListComponent, canActivate: [AuthGuard] },

    { path: 'sport.event', component: SportEventComponent, canActivate: [AuthGuard] },
    {
        path: 'sport.event/:id',
        canActivate: [AuthGuard],
        component: SportEventComponent
    },
    { path: 'sport.team', component: SportTeamComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);