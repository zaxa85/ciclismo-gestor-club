import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }from 'rxjs/Subscription';
import { AlertService, MemberService } from '../services/index';
import { Member } from '../models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'member.register.component.html'
})

export class RegisterMemberComponent {
    model: any = {};
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    member: Member;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService,
        private alertService: AlertService) { }

    register() {

        this.loading = true;


        if (document.getElementById('action') == null) {

            this.memberService.create(this.model)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate(['/member.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }

        else {
            this.loading = true;
            this.memberService.update(this.model)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    this.router.navigate(['/member.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {

       this.sub = this.route.params
            .subscribe(
                params => {
                    let id = +params['id'];
                    this.getMember(id);
        });
    }
    
     getMember(id: number) {
                this.memberService.getById(id).subscribe(
            member => this.member = member,
            error => this.errorMessage = < any>error);
    }
}