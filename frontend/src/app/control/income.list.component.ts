import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, IncomeService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'income.list.component.html'
})

export class IncomeListComponent {
    //currentUser: User;
    model: any;
    statusFilter = '2016';

    constructor(
        private incomeService: IncomeService,
    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.onChange(this.statusFilter);
    }

    onChange(year) {
        this.incomeService.getAll().subscribe(income => { this.model = income; });
    }
}