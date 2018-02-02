import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Period } from '../models/index';

import { AlertService, AuthenticationService, PeriodService, PaymentService, IncomeService, ExpenditureService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'control.balance.html'
})



export class ControlBalanceComponent implements OnInit {
    //currentUser: User;
    statusFilter = '0: 2016';
    periods: Period[] = [];
    viewExpendituresPerPeriod = '';
    viewIncomessPerPeriod = '';
    //result: any;
    paymentControl: any;

    constructor(
        private periodService: PeriodService,
        private incomeService: IncomeService,
        private expenditureService: ExpenditureService,
        private paymentService: PaymentService,

    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //Load periods dropdown
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        this.onChange(this.statusFilter);
    }

    onChange(year) {

        this.paymentService.getPaymentBalanceByPeriod(year.split(":")[1].trim()).subscribe(paymentControl => { this.paymentControl = paymentControl; });

        this.expenditureService.getExpendituresPerPeriod(year.split(":")[1].trim()).subscribe(data => {
            this.viewExpendituresPerPeriod = data + ' Soles'
        });

        this.incomeService.getIncomesPerPeriod(year.split(":")[1].trim()).subscribe(data => {
            this.viewIncomessPerPeriod = data + ' Soles'
        });
    }
}



export class Modelo1 {
    //expendituresPerPeriod: number;    
    constructor(
        public expendituresPerPeriod: string

    ) { }
}
export class Modelo2 {
    //incomesPerPeriod: number;    
    constructor(
        public incomesPerPeriod: number,
    ) { }
}