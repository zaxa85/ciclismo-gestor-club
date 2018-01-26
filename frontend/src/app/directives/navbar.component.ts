// core/navbar.component.ts
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material';

@Component({
    templateUrl: 'navbar.component.html',
    selector: 'ct-navbar',
    styleUrls: ['sidebar.component.css'],
})
export class NavbarComponent {

    isIn = false;   // store state
    isLogged = false;

    constructor(private router: Router) { }

    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }

    ngDoCheck() {
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        this.isLogged = false;
    }
}