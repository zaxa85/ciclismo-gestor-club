import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class StorageService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    postFile(fileToUpload: File, location: string): Observable<boolean> {
        const endpoint = this.API_URL + '/api/containers/' + location + '/upload';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return<any>this.http.post(endpoint, formData); 
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}