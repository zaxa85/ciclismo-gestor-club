import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Payment } from '../models/index';
import { Period } from '../models/index';

import { PaymentService } from '../services/index';
import { IncomeService } from '../services/index';
import { ExpenditureService } from '../services/index';

import { AlertService, AuthenticationService, PeriodService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'control.payment.html'
})

export class ControlPaymentComponent implements OnInit {
    //currentUser: User;
    model: any;
    statusFilter = '0: 2016';
    periods: Period[] = [];

    constructor(
        private periodService: PeriodService,
        private paymentService: PaymentService,
        private incomeService: IncomeService,
        private expenditureService: ExpenditureService,
        ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });

        this.onChange(this.statusFilter);
    }
        
    onChange(year) {        
        this.paymentService.getPaymentControlByPeriod(year.split(":")[1].trim()).subscribe(model => { this.model = model; });
    }

    setFormat(paymentStatus) {
        if (paymentStatus == "1") {
            return "btn btn-warning";
        } else if (paymentStatus == "2") {
            return "btn btn-default";
        } else {
            return "";
        }
    }
}