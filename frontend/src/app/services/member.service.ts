import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Member } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class MemberService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/member', this.jwt()).map((response: Response) => response.json());
    }

    getByStatus(status: number) {       
        return this.http.get(this.API_URL + '/api/member', {
            search:
            { filter: JSON.stringify({"where": { status: status} })}
        }).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/member/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(member: Member) {
        return this.http.post(this.API_URL + '/api/member/', member, this.jwt()).map((response: Response) => response.json());
    }

    update(member: Member) {
        return this.http.patch(this.API_URL + '/api/member/' + member.id, member, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/member/' + id, this.jwt()).map((response: Response) => response.json());
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