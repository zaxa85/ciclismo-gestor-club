import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }from 'rxjs/Subscription';
import { AlertService, IncomeService } from '../services/index';
import { Income } from '../models/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'income.register.component.html',
    providers: [DatePipe]
})

export class RegisterIncomeComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    income: Income;
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }];
    types = [{ id: 1, name: "Auspicio" }, { id: 2, name: "Donación" }, { id: 0, name: "Ganancia" }];
    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private incomeService: IncomeService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }

    // Main process
    register() {

        this.loading = true;

        // If Income is NaN, this will follow income creation
        if (isNaN(this.income.id)) {

            this.incomeService.create(this.income)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    //this.router.navigate(['/income.list']);
                    this.router.navigate(['/control.payment']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
        else {

            this.incomeService.update(this.income)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    //this.router.navigate(['/income.list']);
                    this.router.navigate(['/control.payment']);
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
        this.income = new Income();
        this.income.status = 1;
        this.income.type = 1;

        //Loading income if it exists
        this.sub = this.route.params
            .subscribe(
            params => {
                let id = +params['id'];
                if (!isNaN(id)) {
                    this.getIncome(id);
                }
            });

    }

    getIncome(id: number) {
        this.incomeService.getById(id).subscribe(
            income => this.income = income,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private dateChanged1(newDate) {
   //     this.income.dob = newDate;
    }

    private dateChanged2(newDate) {
   //     this.income.datestart = newDate;
    }
}