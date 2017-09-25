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
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'control.balance', component: ControlBalanceComponent },
    { path: 'control.payment', component: ControlPaymentComponent },
    { path: 'control.register.payment', component: RegisterPaymentComponent },
    { path: 'member.register', component: RegisterMemberComponent },
     { path: 'member.register/:id', 
        canActivate: [ AuthGuard],
        component: RegisterMemberComponent},
    { path: 'member.list', component: MemberListComponent },
    { path: 'sponsor.register', component: RegisterSponsorComponent },
    { path: 'income.register', component: RegisterIncomeComponent },
    { path: 'expenditure.register', component: RegisterExpenditureComponent },    
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