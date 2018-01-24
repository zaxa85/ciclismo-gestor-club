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

    definirEstado(param) {
        if (param == 1) {
            return "Activo"
        } else {
            return "Inactivo"    
        }
    }

    definirTipo(param) {
        if (param == 1) {
            return "Gastos por tramites"
        }
        else if (param == 2) {
            return "Gastos por transporte"
        }
        else if (param == 3) {
            return "Gastos por inscripciones"
        } 
        else if (param == 4) {
            return "Gastos por reuniones"
        } 
        else if (param == 5) {
            return "Gastos de competencia"
        } 
        else {
            return "Otros gastos"    
        }
    }
}