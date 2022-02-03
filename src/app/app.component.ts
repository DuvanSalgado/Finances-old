import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Credito', url: 'home/credit', icon: 'mail' },
    { title: 'Km/moto', url: 'home/moto', icon: 'paper-plane' }
  ];

  constructor() { }
}
