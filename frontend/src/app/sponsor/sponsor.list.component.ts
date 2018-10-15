import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';
import { Subscription } from 'rxjs';
import { Sponsor } from '../models/index';
import { SponsorService } from '../services/sponsor.service';

@Component({
    moduleId: module.id,
    templateUrl: 'sponsor.list.component.html'
})

export class SponsorListComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    sponsor: Sponsor;
    model: any;

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    types = [{ id: 1, name: "Auspicio" }, { id: 2, name: "Donación" }, { id: 3, name: "Ganancia" }, { id: 0, name: "Otro" }];
    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sponsorService: SponsorService,
        private alertService: AlertService) { }

    ngOnInit() {
        //Load periods dropdown
        // this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        this.onChange(1);
    }

    onChange(status) {
        this.sponsorService.getAll().subscribe(sponsor => { this.model = sponsor; });
    }

    definirEstado(param) {
        if (param == 1) {
            return "Activo"
        } else {
            return "Inactivo"
        }
    }

    definirTipoDocumento(param) {
        if (param == 1) {
            return "RUC"
        }
        else if (param == 2) {
            return "DNI"

        } else {
            return "Otro"
        }
    }
}
