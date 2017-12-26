// core/navbar.component.ts
import { Component } from '@angular/core';

@Component({
     templateUrl: 'navbar.component.html',
     selector: 'ct-navbar',
})
export class NavbarComponent {
    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}