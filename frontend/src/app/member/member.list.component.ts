import { Component, OnInit } from '@angular/core';
import { Member } from '../models/index';
import { User } from '../models/index';
import { MemberService } from '../services/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'memberlist',
    templateUrl: 'member.list.component.html',
    providers: [DatePipe]
})

export class MemberListComponent implements OnInit {
    currentUser: User;
    members: Member[] = [];
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }, { id: -1, name: "Todos" }];
    statusFilter = 1;
    isAdmin = false;

    constructor(
        private memberService: MemberService,
        private datePipe: DatePipe
        ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var role = localStorage.getItem('userRoles');
        this.isAdmin = (role === "admin") ? true : false;
    }

    ngOnInit() {
        this.onChange(this.statusFilter);
    }

    deleteMember(id: number) {

        var retVal = confirm("Esta seguro de eliminar al socio seleccionado?");
        if (retVal == true) {
            this.memberService.delete(id).subscribe(() => { this.loadAllUsers(1) });
            return true;
        }
        else {
            return false;
        }
    }

    private loadAllUsers(status : number) {
        this.memberService.getByStatus(status).subscribe(members => { this.members = members; });
    }
    
    showStatusDescription(status : number) : string {
        if (status == 1) {
            return "Activo";
        } else if (status == 2) {
            return "Suspendido";
        } else if (status == 0) {
            return "Inactivo";
        } else {
            return "Indeterminado" ;
        }
    }
    
    onChange(status) {        
       if (status != -1) {
            this.memberService.getByStatus(status).subscribe(members => { this.members = members; });
       } else {
           this.memberService.getAll().subscribe(members => { this.members = members; });
       }
    }
}