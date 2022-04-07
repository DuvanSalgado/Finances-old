import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sk-expenses',
  templateUrl: './sk-expenses.component.html',
  styleUrls: ['./sk-expenses.component.scss'],
})
export class SkExpensesComponent {

  @Input() loading = false;
  items: number[] = [0, 1, 2, 3];

}
