import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, MemberService, StorageService } from '../services/index';
import { Member } from '../models/index';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
    moduleId: module.id,
    templateUrl: 'member.register.component.html',
    styles: [`
    .preview img{
      max-height: 50px;
    }
  `],
    providers: [DatePipe]
})

export class RegisterMemberComponent {
    loading = false;
    private sub: Subscription;
    errorMessage: string;
    member: Member;
    statuses = [{ id: 1, name: "Activo" }, { id: 2, name: "Suspendido" }, { id: 0, name: "Inactivo" }];
    fileToUpload: File = null;
    imageSrc: string;
    private API_URL = environment.apiUrl;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private memberService: MemberService,
        private fileUploadService: StorageService,
        private datePipe: DatePipe,
        private alertService: AlertService) { }

    onFileChanged(event) {

        if (event.target.files && event.target.files[0]) {

            this.fileToUpload = event.target.files[0];
            this.member.photoname = this.fileToUpload.name;

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
        this.fileUploadService.postFile(this.fileToUpload, 'members').subscribe(data => {
            // do something, if upload success
        }, error => {
            console.log(error);
        });
    }

    // Main process
    register() {

        this.loading = true;
        // If Member is NaN, this will follow member creation
        if (isNaN(this.member.id)) {
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

        this.uploadFileToActivity();
    }

    //Initializing screen values
    ngOnInit(): void {

        //Initializing member
        this.member = new Member();
        this.member.status = 1;
        this.member.photoname = "default.jpg";
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

    dateChanged1(newDate) {
        this.member.dob = newDate;
    }

    dateChanged2(newDate) {
        this.member.datestart = newDate;
    }
}