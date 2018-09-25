import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {

        return this.http.get('http://192.168.1.132:3000/api/users2/count', {
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
                }
                else {
                    throw "Usuario o contraseña incorrecto";
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}