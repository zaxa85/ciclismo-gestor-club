import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';

import { RegisterMemberComponent } from './member/index';
import { RegisterSponsorComponent } from './sponsor/index';

import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'control.balance', component: ControlBalanceComponent },
    { path: 'control.payment', component: ControlPaymentComponent },
    { path: 'member.register', component: RegisterMemberComponent },
    { path: 'sponsor.register', component: RegisterSponsorComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);