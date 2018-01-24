import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }from 'rxjs/Subscription';
import { AlertService, ExpenditureService, PeriodService } from '../services/index';
import { Expenditure } from '../models/index';
import { Period } from '../models/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'expenditure.register.component.html',
    providers: [DatePipe]
})

export class RegisterExpenditureComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    expenditure: Expenditure;
    periods: Period[] = [];

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    types = [{ id: 1, name: "Gastos por tramites" }, 
                { id: 2, name: "Gastos por transporte" }, 
                { id: 3, name: "Gastos por inscripciones" }, 
                { id: 4, name: "Gastos por reuniones" }, 
                { id: 0, name: "Gastos de competencia" }];

    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private expenditureService: ExpenditureService,
        private periodService: PeriodService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }

    // Main process
    register() {

        this.loading = true;

        // If Expenditure is NaN, this will follow expenditure creation
        if (isNaN(this.expenditure.id)) {

            this.expenditureService.create(this.expenditure)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate(['/expenditure.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
        else {

            this.expenditureService.update(this.expenditure)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    this.router.navigate(['/expenditure.list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
    }

    //Initializing screen values
    ngOnInit(): void {

        //Load periods dropdown
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });

        //Initializing expenditure
        this.expenditure = new Expenditure();
        this.expenditure.status = 1;
        this.expenditure.type = 0;
      //  this.expenditure.datestart = new Date();//this.datePipe.transform(new Date(), 'yyyy-MM-dd');
       // this.expenditure.dob = new Date(); //this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        //Loading expenditure if it exists
        this.sub = this.route.params
            .subscribe(
            params => {
                let id = +params['id'];
                if (!isNaN(id)) {
                    this.getExpenditure(id);
                }
            });

    }

    getExpenditure(id: number) {
        this.expenditureService.getById(id).subscribe(
            expenditure => this.expenditure = expenditure,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private dateChanged1(newDate) {
        //this.expenditure.dob = newDate;
    }

    private dateChanged2(newDate) {
        //this.expenditure.datestart = newDate;
    }
}