import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.API_URL + '/api/user2', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.API_URL + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.API_URL + '/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.API_URL + '/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.API_URL + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
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