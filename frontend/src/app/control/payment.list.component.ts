import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Period } from '../models/index';

import { AlertService, AuthenticationService, PaymentService, PeriodService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'payment.list.component.html'
})

export class PaymentListComponent {
    //currentUser: User;
    model: any;
    statusFilter = '0: 2016';
    periods: Period[] = [];

    constructor(
        private paymentService: PaymentService,
        private periodService: PeriodService,

    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        this.onChange(this.statusFilter);
    }
        
    onChange(year) {        
        this.paymentService.getByMember(1, year.split(":")[1]).subscribe(payments => { this.model = payments; });
    }

    definirEstado(param) {
        if (param == 1) {
            return "Enviado"
        } else if (param == 2) {
                return "Aprovado"
        } else {
            return "Inactivo"    
        }
    }

}