import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }from 'rxjs/Subscription';
import { AlertService, MemberService, PeriodService, PaymentService, StorageService  } from '../services/index';
import { Member } from '../models/index';
import { Period } from '../models/index';
import { Payment } from '../models/index';
import { DatePipe } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'control.payment.register.component.html',
    providers: [DatePipe]
}) 

export class RegisterPaymentComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    payment: Payment;
    members: Member[] = [];
    periods: Period[] = [];
    months = [{ id: 1, name: "Enero" }, { id: 2, name: "Febrero" }, { id: 3, name: "Marzo" }, 
                { id: 4, name: "Abril" }, { id: 5, name: "Mayo" }, { id: 6, name: "Junio" }, 
                { id: 7, name: "Julio" }, { id: 8, name: "Agosto" }, { id: 9, name: "Septiembre" }, 
                { id: 10, name: "Octubre" }, { id: 11, name: "Noviembre" }, { id: 12, name: "Diciembre" }];
    rutaBalance = '/control.payment';
    rutaIngreso = '/payment.list';
    rutaFinal = '';
    dropDisabled = false;
    administrator = true;
    fileToUpload: File = null;
    imageSrc: string;
    currentYear: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService,
        private fileUploadService: StorageService,
        private paymentService: PaymentService,
        private periodService: PeriodService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }

        onFileChanged(event) {

            if (event.target.files && event.target.files[0]) {
    
                this.fileToUpload = event.target.files[0];
                this.payment.document = this.fileToUpload.name;
    
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
        this.fileUploadService.postFile(this.fileToUpload, 'payments').subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }

    // Main process
    register() {

        this.loading = true;
        
        this.definirRetorno();

        // If Member is NaN, this will follow member creation
        if (isNaN(this.payment.id)) {
            this.payment.status = 1;
            this.paymentService.create(this.payment)
                .subscribe(
                data => {
                    this.alertService.success('Registro exitoso', true);
                    this.router.navigate([this.rutaFinal]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
        else {

            this.paymentService.update(this.payment)
                .subscribe(
                data => {
                    this.alertService.success('Modificación exitosa', true);
                    this.router.navigate([this.rutaFinal]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }

        this.uploadFileToActivity();
    }

    approve() {
        this.loading = true;
        
        this.definirRetorno();

        this.payment.status = 2;
        this.payment.document = "default.jpg";

        this.paymentService.update(this.payment)
        .subscribe(
        data => {
            this.alertService.success('El pago ha sido aprobado', true);
            this.router.navigate([this.rutaFinal]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }

    //Initializing screen values
    ngOnInit(): void {

        //Setting default values
        this.currentYear = (new Date()).getFullYear();

        //Load periods dropdown
        this.periodService.getByStatus(1).subscribe(periods => { this.periods = periods; });
        
        //Load members dropdown
        this.memberService.getByStatus(1).subscribe(members => { this.members = members; });
        
        //Initializing member
        this.payment = new Payment();
        this.payment.status = 0;
        this.payment.dateperform = new Date();
        this.payment.datecreated = new Date();
        
        //Loading member if it exists
        this.sub = this.route.params
            .subscribe(
            params => {

                if (params['id'] == "single") {
                    this.rutaFinal = "single";
                    this.payment.id_fk_member_id =  1;
                    this.dropDisabled = true;

                } else if (params['id'] == "all") {
                    this.rutaFinal = "all";
                    this.payment.id_fk_period_id = (new Date()).getFullYear();
                } else {
                    let id = +params['id'];

                    if (!isNaN(id)) {
                        this.rutaFinal = "all";
                        this.getPayment(id);
                    }
                }
            });
    }

    getPayment(id: number) {
        this.paymentService.getById(id).subscribe(
            payment => this.payment = payment,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
         this.sub.unsubscribe();
    }

    dateChanged(newDate) {
        this.payment.dateperform = newDate;
    }

    private definirRetorno() {
        if (this.rutaFinal == "single") {
            this.rutaFinal = this.rutaIngreso;
        } else if (this.rutaFinal == "all") {
            this.rutaFinal = this.rutaBalance;
        } else {
            this.rutaFinal = 'login';
        }
    }

    back() {
        this.definirRetorno();
        this.router.navigate([this.rutaFinal]);
    }
}

/*

<input type="file" (change)="fileChange($event)" placeholder="Upload file" accept=".pdf,.doc,.docx">

fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        // No need to include Content-Type in Angular 4 
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}
*/