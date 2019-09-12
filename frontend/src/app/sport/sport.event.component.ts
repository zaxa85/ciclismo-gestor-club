import { User } from '../models/index';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, SportEventService } from '../services/index';
import { SportEvent } from '../models/index';

@Component({
    moduleId: module.id,
    selector: 'sportevent',
    templateUrl: 'sport.event.component.html',
    providers: [DatePipe]
})

export class SportEventComponent {
    currentUser: User;
    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    eventtype = [{ id: 1, name: "Rally" }, { id: 2, name: "XC" }, { id: 3, name: "XCO" }, { id: 4, name: "XCM" },
    { id: 5, name: "Enduro" }, { id: 6, name: "Downhill" }, { id: 7, name: "Ruta" }, { id: 8, name: "Entrenamiento" },
    { id: 9, name: "Tour - Paseo" }, { id: -1, name: "Todos" }];
    
    statusFilter = 1;
    sportEvent : SportEvent;
    loading = false;
    private sub: Subscription;
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sportEventService: SportEventService,
        private alertService: AlertService) { }

    // Main process
    register() {

        this.loading = true;

        // If Income is NaN, this will follow income creation
        if (isNaN(this.sportEvent.id)) {

            this.sportEventService.create(this.sportEvent)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate(['/sport.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
        else {

            this.sportEventService.update(this.sportEvent)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    this.router.navigate(['/sport.list']);
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
        this.sportEvent = new SportEvent();
        this.sportEvent.status = 1;
 
        //Loading income if it exists
        this.sub = this.route.params
            .subscribe(
            params => {
                let id = +params['id'];
                if (!isNaN(id)) {
                    this.getSportEvent(id);
                }
            });
    }

    getSportEvent(id: number) {
        this.sportEventService.getById(id).subscribe(
            sportEvent => this.sportEvent = sportEvent,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    dateChanged1(newDate) {
        this.sportEvent.datestart = newDate;
    }

    dateChanged2(newDate) {
        this.sportEvent.datefinish = newDate;
    }
}