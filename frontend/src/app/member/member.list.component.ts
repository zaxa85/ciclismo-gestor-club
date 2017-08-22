import { Component, OnInit } from '@angular/core';

import { Member } from '../models/index';
import { User } from '../models/index';

import { MemberService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'memberlist',
    templateUrl: 'member.list.component.html'
})

export class MemberListComponent implements OnInit {
    currentUser: User;
    members: Member[] = [];

    constructor(private memberService: MemberService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteMember(id: number) {

        var retVal = confirm("Esta seguro de eliminar al socio seleccionado?");
        if (retVal == true) {
            this.memberService.delete(id).subscribe(() => { this.loadAllUsers() });
            return true;
        }
        else {
            return false;
        }
    }

    private loadAllUsers() {
        //  this.memberService.getAll().subscribe(members => { this.members = members; });
        this.memberService.getByStatus(1).subscribe(members => { this.members = members; });
    }
}