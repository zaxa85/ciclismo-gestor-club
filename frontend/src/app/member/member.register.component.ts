import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }from 'rxjs/Subscription';
import { AlertService, MemberService } from '../services/index';
import { Member } from '../models/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'member.register.component.html',
    providers: [DatePipe]
})

export class RegisterMemberComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    member: Member;
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }];
    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }

    // Main process
    register() {

        this.loading = true;

        // If Member is NaN, this will follow member creation
        if (isNaN(this.member.id)) {

            alert(this.member.dob);

            this.memberService.create(this.member)
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

            this.memberService.update(this.member)
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

    //Initializing screen values
    ngOnInit(): void {

        //Initializing member
        this.member = new Member();
        this.member.status = 1;

        this.member.datestart = new Date();//this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.member.dob = new Date(); //this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        //Loading member if it exists
        this.sub = this.route.params
            .subscribe(
            params => {
                let id = +params['id'];
                if (!isNaN(id)) {
                    this.getMember(id);
                }
            });

    }

    getMember(id: number) {
        this.memberService.getById(id).subscribe(
            member => this.member = member,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private dateChanged1(newDate) {
        this.member.dob = newDate;
    }

    private dateChanged2(newDate) {
        this.member.datestart = newDate;
    }
}