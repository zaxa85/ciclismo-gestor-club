import { Component, OnInit } from '@angular/core';
import { Member } from '../models/index';
import { User } from '../models/index';
import { MemberService } from '../services/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'sportevent',
    templateUrl: 'sport.event.component.html',
    providers: [DatePipe]
})

export class SportEventComponent {
    currentUser: User;
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }, { id: -1, name: "Todos" }];
    statusFilter = 1;
    
    constructor(
        private datePipe: DatePipe
        ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

}