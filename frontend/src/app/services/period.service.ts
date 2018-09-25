import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Period } from '../models/index';

@Injectable()
export class PeriodService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://192.168.1.132:3000/api/period', this.jwt()).map((response: Response) => response.json());
    }

    getByStatus(status: number) {       
        return this.http.get('http://192.168.1.132:3000/api/period', {
            search:
            { filter: JSON.stringify({"where": { status: status} })}
        }).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('http://192.168.1.132:3000/api/period/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(period: Period) {
        return this.http.post('http://192.168.1.132:3000/api/period/', period, this.jwt()).map((response: Response) => response.json());
    }

    update(period: Period) {
        return this.http.patch('http://192.168.1.132:3000/api/period/' + period.id, period, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://192.168.1.132:3000/api/period/' + id, this.jwt()).map((response: Response) => response.json());
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