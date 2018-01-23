import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, ExpenditureService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'expenditure.list.component.html'
})

export class ExpenditureListComponent {
    //currentUser: User;
    model: any;

    statusFilter = '2016';

    constructor(
        private expenditureService: ExpenditureService,
    ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        this.onChange(this.statusFilter);
    }

    onChange(year) {
        this.expenditureService.getAll().subscribe(expenditure => { this.model = expenditure; });
    }
}