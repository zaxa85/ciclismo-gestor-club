import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, MemberService } from '../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'member.register.component.html'
})

export class RegisterMemberComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: MemberService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
