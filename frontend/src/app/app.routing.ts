import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { ControlBalanceComponent } from './control/index';
import { ControlPaymentComponent } from './control/index';
import { RegisterMemberComponent } from './member/index';
import { MemberListComponent } from './member/index';

import { RegisterSponsorComponent } from './sponsor/index';
import { RegisterPaymentComponent } from './control/index';
import { RegisterIncomeComponent } from './control/index';
import { RegisterExpenditureComponent } from './control/index';
import { IncomeListComponent } from './control/index';
import { ExpenditureListComponent } from './control/index';
import { PaymentListComponent } from './control/index';

import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'control.balance', component: ControlBalanceComponent, canActivate: [AuthGuard] },
    { path: 'control.payment', component: ControlPaymentComponent, canActivate: [AuthGuard] },
    { path: 'control.register.payment', component: RegisterPaymentComponent, canActivate: [AuthGuard] },
        { path: 'control.register.payment/:id', 
        canActivate: [ AuthGuard],
        component: RegisterPaymentComponent},

    { path: 'member.register', component: RegisterMemberComponent, canActivate: [AuthGuard] },
        { path: 'member.register/:id', 
        canActivate: [ AuthGuard],
        component: RegisterMemberComponent},
    { path: 'member.list', component: MemberListComponent, canActivate: [AuthGuard] },
    { path: 'sponsor.register', component: RegisterSponsorComponent, canActivate: [AuthGuard] },
    { path: 'income.register', component: RegisterIncomeComponent, canActivate: [AuthGuard] },
        { path: 'income.register/:id', 
        canActivate: [ AuthGuard],
        component: RegisterIncomeComponent},
    { path: 'income.list', component: IncomeListComponent, canActivate: [AuthGuard] },
    { path: 'expenditure.register', component: RegisterExpenditureComponent, canActivate: [AuthGuard] },
    { path: 'expenditure.list', component: ExpenditureListComponent, canActivate: [AuthGuard] },
    { path: 'payment.list', component: PaymentListComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
/*

    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id',
        canActivate: [ ProductDetailGuard],
        component: ProductDetailComponent
      }
    ])

*/
export const routing = RouterModule.forRoot(appRoutes);