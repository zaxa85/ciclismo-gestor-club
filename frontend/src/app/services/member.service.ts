import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Member } from '../models/index';

@Injectable()
export class MemberService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:3000/api/member', this.jwt()).map((response: Response) => response.json());
    }
    // http://localhost:3000/api/member?filter={"where":{"status":0}}

    getByStatus(status: number) {       
        return this.http.get('http://localhost:3000/api/member', {
            search:
            { filter: JSON.stringify({"where": { status: status} })}
        }).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/api/member/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(member: Member) {
        return this.http.post('http://localhost:3000/api/member/', member, this.jwt()).map((response: Response) => response.json());
    }

    update(member: Member) {
        return this.http.patch('http://localhost:3000/api/member/' + member.id, member, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/api/member/' + id, this.jwt()).map((response: Response) => response.json());
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