import { Component } from '@angular/core';
import { SportEvent, Period } from '../models/index';
import { User } from '../models/index';
import { SportEventService, PeriodService } from '../services/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'sportlist',
    templateUrl: 'sport.list.component.html',
    providers: [DatePipe]
})

export class SportListComponent {
    currentUser: User;
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }, { id: -1, name: "Todos" }];
    eventtype = [{ id: 1, name: "Rally" }, { id: 2, name: "XC" }, { id: 3, name: "XCO" }, { id: 4, name: "XCM" },
    { id: 5, name: "Enduro" }, { id: 6, name: "Downhill" }, { id: 7, name: "Ruta" }, { id: 8, name: "Entrenamiento" },
    { id: 9, name: "Tour - Paseo" }, { id: -1, name: "Todos" }];

    statusFilter = 1;
     periodFilter = '0: 2019';
     //periodFilter = '';

    periods: Period[] = [];
    events: SportEvent[] = [];

    isAdmin = false;

    constructor(
        private sportEventService: SportEventService,
        private periodService: PeriodService,

    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var role = localStorage.getItem('userRoles');
        this.isAdmin = (role === "admin") ? true : false;
    }

    ngOnInit() {
       // this.onChange(this.statusFilter);

        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        this.onChange3(this.periodFilter, 1);
    }

    deleteMember(id: number) {

        var retVal = confirm("Esta seguro de eliminar el evento seleccionado?");
        if (retVal == true) {
            this.sportEventService.delete(id).subscribe(() => { this.loadAllUsers(1) });
            return true;
        }
        else {
            return false;
        }
    }

    private loadAllUsers(status: number) {
        this.sportEventService.getByStatus(status).subscribe(events => { this.events = events; });
    }

    showStatusDescription(status: number): string {
        if (status == 1) {
            return "Activo";
        } else if (status == 2) {
            return "Cancelado";
        } else if (status == 0) {
            return "Inactivo";
        } else {
            return "Indeterminado";
        }
    }

    showTypeDescription(type: number) {
        if (type == 1) {
            return "Rally";
        } else if (type == 2) {
            return "XC";
        } else if (type == 3) {
            return "XCO";
        } else if (type == 4) {
            return "XCM";
        } else if (type == 5) {
            return "Enduro";
        } else if (type == 6) {
            return "Downhill";
        } else if (type == 7) {
            return "Ruta";
        } else if (type == 8) {
            return "Entrenamiento";
        } else if (type == 9) {
            return "Tour - Paseo";
        } else if (type == -1) {
            return "Todos";
        } else {
            return "Indeterminado";
        }
     }

    onChange(status) {
        if (status != -1) {
            this.sportEventService.getByStatus(status).subscribe(events => { this.events = events; });
        } else {
            this.sportEventService.getAll().subscribe(events => { this.events = events; });
        }
    }

    onChange2(year) {
    }

    onChange3(year, status) {

        if (status != -1) {
            this.sportEventService.getByStatusAndPeriod(year.split(":")[1].trim(), status).subscribe(events => { this.events = events; });
        } else {
            this.sportEventService.getAll().subscribe(events => { this.events = events; });
        }
    }
}