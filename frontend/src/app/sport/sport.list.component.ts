import { Component } from '@angular/core';
import { SportEvent } from '../models/index';
import { User } from '../models/index';
import { SportEventService } from '../services/index';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'sportlist',
    templateUrl: 'sport.list.component.html',
    providers: [DatePipe]
})

export class SportListComponent {
    currentUser: User;
    events: SportEvent[] = [];
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }, { id: -1, name: "Todos" }];
    eventtype = [{ id: 1, name: "Rally" }, { id: 2, name: "XC" }, { id: 3, name: "XCO" }, { id: 4, name: "XCM" }, 
                    { id: 5, name: "Enduro" }, { id: 6, name: "Downhill" }, { id: 7, name: "Ruta" }, { id: 8, name: "Entrenamiento" }, 
                        { id: 9, name: "Tour - Paseo" }, { id: -1, name: "Todos" }];

    statusFilter = 1;
    isAdmin = false;

    constructor(
        private sportEventService: SportEventService,
        ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var role = localStorage.getItem('userRoles');
        this.isAdmin = (role === "admin") ? true : false;
    }

    ngOnInit() {
        this.onChange(this.statusFilter);
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

    private loadAllUsers(status : number) {
        this.sportEventService.getByStatus(status).subscribe(events => { this.events = events; });
    }
    
    showStatusDescription(status : number) : string {
        if (status == 1) {
            return "Activo";
        } else if (status == 2) {
            return "Cancelado";
        } else if (status == 0) {
            return "Inactivo";
        } else {
            return "Indeterminado" ;
        }
    }
    
    onChange(status) {        
       if (status != -1) {
            this.sportEventService.getByStatus(status).subscribe(events => { this.events = events; });
       } else {
           this.sportEventService.getAll().subscribe(events => { this.events = events; });
       }
    }
}