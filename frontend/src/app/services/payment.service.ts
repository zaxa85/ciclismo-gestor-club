import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Payment } from '../models/index';

@Injectable() 
export class PaymentService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/api/v_payment_control', this.jwt()).map((response: Response) => response.json());
    }
    // http://localhost:3000/api/member?filter={"where":{"status":0}}

    getByStatus(year: string) {       
        return this.http.get('http://localhost:3000/api/v_payment_control', {
            search:
            { filter: JSON.stringify({"where": { period: year} })}
        }).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/api/payment/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(payment: Payment) {
        return this.http.post('http://localhost:3000/api/payment/', payment, this.jwt()).map((response: Response) => response.json());
    }

    update(payment: Payment) {
        return this.http.patch('http://localhost:3000/api/payment/' + payment.id, payment, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/api/payment/' + id, this.jwt()).map((response: Response) => response.json());
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