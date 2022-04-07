import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sk-loans',
  templateUrl: './sk-loans.component.html',
  styleUrls: ['./sk-loans.component.scss'],
})
export class SkLoansComponent {

  @Input() loading = false;
  items: number[] = [0, 1, 2, 3];

}
