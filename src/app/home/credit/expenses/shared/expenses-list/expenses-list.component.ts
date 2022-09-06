import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IExpensesModel } from '../model/interfaces/expenses';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent {

  @Input() expenses: Array<IExpensesModel> = [];
  @Input() type: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Output() eventEmiterItem = new EventEmitter<IExpensesModel>();

  public deleteItem(item: IExpensesModel): void {
    this.eventEmiterItem.emit(item);
  }

}
