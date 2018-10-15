import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, SponsorService } from '../services/index';
import { Sponsor } from '../models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'sponsor.register.component.html'
})

export class SponsorRegisterComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    sponsor: Sponsor;

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    documenttypes = [{ id: 1, name: "RUC" }, { id: 0, name: "DNI" }, { id: 3, name: "Otro" }];

    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sponsorService: SponsorService,
        private alertService: AlertService) { }

    // Main process
    register() {

        this.loading = true;

        // If Income is NaN, this will follow income creation
        if (isNaN(this.sponsor.id)) {

            this.sponsorService.create(this.sponsor)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate(['/sponsor.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
        else {

            this.sponsorService.update(this.sponsor)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    this.router.navigate(['/sponsor.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
    }

    //Initializing screen values
    ngOnInit(): void {

        //Initializing income
        this.sponsor = new Sponsor();
        this.sponsor.status = 1;
        this.sponsor.documenttype = 1;

        //Loading income if it exists
        this.sub = this.route.params
            .subscribe(
            params => {
                let id = +params['id'];
                if (!isNaN(id)) {
                    this.getSponsor(id);
                }
            });

    }

    getSponsor(id: number) {
        this.sponsorService.getById(id).subscribe(
            sponsor => this.sponsor = sponsor,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}