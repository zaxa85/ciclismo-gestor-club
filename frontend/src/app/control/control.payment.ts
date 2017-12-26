import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Payment } from '../models/index';
import { PaymentService } from '../services/index';
import { IncomeService } from '../services/index';
import { ExpenditureService } from '../services/index';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'control.payment.html'
})

export class ControlPaymentComponent implements OnInit {
    //currentUser: User;
    model: any;
    model2: any;
    model3: any;
    statusFilter = '2016';
    
    constructor(
        private paymentService: PaymentService,
        private incomeService: IncomeService,
        private expenditureService: ExpenditureService,
        ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        this.onChange(this.statusFilter);
    }

    private loadAllPayments(year : string) {
        this.paymentService.getByStatus(year).subscribe(members => { this.model = members; });
    }
        
    onChange(year) {        
        this.paymentService.getByStatus(year).subscribe(members => { this.model = members; });
        this.incomeService.getAll().subscribe(income => { this.model2 = income; });
        this.expenditureService.getAll().subscribe(expenditure => { this.model3 = expenditure; });
    }
}