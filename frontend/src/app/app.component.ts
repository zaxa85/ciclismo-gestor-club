import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
}) 
export class AppComponent {
  title = 'Socios de Ciclismo App';
  showHeader = true;

  ngDoCheck() {
    if (localStorage.getItem('currentUser')) {
        this.showHeader = false;
    }
  } 
}
