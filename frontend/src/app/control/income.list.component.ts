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


    definirEstado(param) {
        if (param == 1) {
            return "Activo"
        } else {
            return "Inactivo"    
        }
    }

    definirTipo(param) {
        if (param == 1) {
            return "Auspicio"
        }
        else if (param == 2) {
            return "Donación"
        }
        else if (param == 3) {
            return "Ganancia"
        } 
        else {
            return "Otro"    
        }
    }
}