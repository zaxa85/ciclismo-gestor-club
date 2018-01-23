import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, PaymentService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'payment.list.component.html'
})

export class PaymentListComponent {
    //currentUser: User;
    model: any;
    statusFilter = '2016';

    constructor(
        private paymentService: PaymentService,
    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.onChange(this.statusFilter);
    }


        
    onChange(year) {        
        this.paymentService.getByMember(1, year).subscribe(payments => { this.model = payments; });
    }
}