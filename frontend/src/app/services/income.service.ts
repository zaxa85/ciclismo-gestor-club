import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Income } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class IncomeService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/income', this.jwt()).map((response: Response) => response.json());
    }

    getByStatus(status: number) {       
        return this.http.get(this.API_URL + '/api/income', {
            search:
            { filter: JSON.stringify({"where": { status: status} })}
        }).map((response: Response) => response.json());
    }

    getByPeriod(period: string) {       
        return this.http.get(this.API_URL + '/api/income', {
            search:
            { filter: JSON.stringify({"where": { id_fk_period_id: period } })}
        }).map((response: Response) => response.json());
    }

    getIncomesPerPeriod(period: string) {  
        return this.http.get(this.API_URL + '/api/income/getIncomesPerPeriod?period=' + period + '&status=1', this.jwt()).map((response: Response) => response.text());
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/income/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(income: Income) {
        return this.http.post(this.API_URL + '/api/income/', income, this.jwt()).map((response: Response) => response.json());
    }

    update(income: Income) {
        return this.http.patch(this.API_URL + '/api/income/' + income.id, income, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/income/' + id, this.jwt()).map((response: Response) => response.json());
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