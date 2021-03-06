import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Sponsor } from '../models/sponsor';
import { environment } from '../../environments/environment';

@Injectable()
export class SponsorService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/sponsor', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/sponsor/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(sponsor: Sponsor) {
        return this.http.post(this.API_URL + '/api/sponsor',sponsor, this.jwt()).map((response: Response) => response.json());
    }

    update(sponsor: Sponsor) {
        return this.http.put(this.API_URL + '/api/sponsor/' + sponsor.id, sponsor, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/sponsor/' + id, this.jwt()).map((response: Response) => response.json());
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