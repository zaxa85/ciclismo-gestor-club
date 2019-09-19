import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { SportEvent } from '../models/sportevent';
import { environment } from '../../environments/environment';

@Injectable()
export class SportEventService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/sportevent', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/sportevent/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getByStatus(status: number) {       
        return this.http.get(this.API_URL + '/api/sportevent', {
            search:
            { filter: JSON.stringify({"where": { status: status} })}
        }).map((response: Response) => response.json());
    }

    getByStatusAndPeriod(period: number, status: number) {       
        return this.http.get(this.API_URL + '/api/sportevent', {
            search: 
            { filter: JSON.stringify({"where": { status: status, id_fk_period_id: period}, "order": "datestart ASC"})}
        }).map((response: Response) => response.json());
    }

    create(sportevent: SportEvent) {
        return this.http.post(this.API_URL + '/api/sportevent',sportevent, this.jwt()).map((response: Response) => response.json());
    }

    update(sportevent: SportEvent) {
        return this.http.put(this.API_URL + '/api/sportevent/' + sportevent.id, sportevent, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/sportevent/' + id, this.jwt()).map((response: Response) => response.json());
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