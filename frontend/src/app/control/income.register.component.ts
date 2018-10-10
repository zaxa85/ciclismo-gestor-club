import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, IncomeService, PeriodService, StorageService } from '../services/index';
import { Income } from '../models/index';
import { Period } from '../models/index';
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
    periods: Period[] = [];

    statuses = [{ id: 1, name: "Activo" }, { id: 0, name: "Inactivo" }];
    types = [{ id: 1, name: "Auspicio" }, { id: 2, name: "Donación" }, { id: 3, name: "Ganancia" }, { id: 0, name: "Otro" }];
    test: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private incomeService: IncomeService,
        private periodService: PeriodService,
        private fileUploadService: StorageService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }
    fileToUpload: File = null;
    imageSrc: string;

    onFileChanged(event) {

        if (event.target.files && event.target.files[0]) {

            this.fileToUpload = event.target.files[0];
            this.income.document = this.fileToUpload.name;

            const reader = new FileReader();

            reader.onload = (event: any) => {
                (<HTMLImageElement>document.getElementById('preview_image')).src = event.target.result
            }

            reader.readAsDataURL(this.fileToUpload);

            const formData2 = new FormData();
            formData2.append(name, this.fileToUpload, this.fileToUpload.name);
        }
    }

    uploadFileToActivity() {
        this.fileUploadService.postFile(this.fileToUpload, 'incomes').subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }

    // Main process
    register() {

        this.loading = true;

        // If Income is NaN, this will follow income creation
        if (isNaN(this.income.id)) {

            this.incomeService.create(this.income)
                .subscribe(
                    data => {
                        this.alertService.success('Registro exitoso', true);
                        this.router.navigate(['/income.list']);
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
                        this.router.navigate(['/income.list']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }

        this.uploadFileToActivity();
    }

    //Initializing screen values
    ngOnInit(): void {

        //Load periods dropdown
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });

        //Initializing income
        this.income = new Income();
        this.income.status = 1;
        this.income.type = 1;
        this.income.document = "default.jpg";
        this.income.id_fk_period_id = (new Date()).getFullYear();

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
}