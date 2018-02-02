import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Expenditure } from '../models/index';

@Injectable()
export class ExpenditureService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/api/expenditure', this.jwt()).map((response: Response) => response.json());
    }

    getByStatus(status: number) {       
        return this.http.get('http://localhost:3000/api/expenditure', {
            search:
            { filter: JSON.stringify({"where": { status: status} })}
        }).map((response: Response) => response.json());
    }

    getByPeriod(period: string) {       
        return this.http.get('http://localhost:3000/api/expenditure', {
            search:
            { filter: JSON.stringify({"where": { id_fk_period_id: period} })}
        }).map((response: Response) => response.json());
    }

    getExpendituresPerPeriod(period: string) {  
        return this.http.get('http://localhost:3000/api/expenditure/getExpendituresPerPeriod?period=' + period + '&status=1', this.jwt()).map((response: Response) => response.text());
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/api/expenditure/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(expenditure: Expenditure) {
        return this.http.post('http://localhost:3000/api/expenditure/', expenditure, this.jwt()).map((response: Response) => response.json());
    }

    update(expenditure: Expenditure) {
        return this.http.patch('http://localhost:3000/api/expenditure/' + expenditure.id, expenditure, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/api/expenditure/' + id, this.jwt()).map((response: Response) => response.json());
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