import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public appPages = [
    { title: 'Credito', url: 'credit', icon: 'mail' },
    { title: 'Km/moto', url: 'moto', icon: 'paper-plane' }
  ];

  constructor() { }

  ngOnInit() { }

}
