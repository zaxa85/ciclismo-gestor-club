import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    private API_URL = environment.apiUrl;

    constructor(private http: Http) { }

    login(username: string, password: string) {

        return this.http.get(this.API_URL + '/api/users2/count', {
            search:
            { where: JSON.stringify({ username: username, password: password }) }
        })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.count > 0) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentUser',  JSON.stringify({ username: username, password: password }));
                    
                    if (username === "admin") {
                        localStorage.setItem('userRoles', "admin");
                    } else {
                        localStorage.setItem('userRoles', "user");

                    }
                    
                }
                else {
                    throw "Usuario o contraseña incorrecto";
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRoles');

    }
}