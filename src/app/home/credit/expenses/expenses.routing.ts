import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesCashComponent } from './expenses-cash/expenses-cash.component';
import { ExpensesCreditComponent } from './expenses-credit/expenses-credit.component';
import { ExpensesDebitComponent } from './expenses-debit/expenses-debit.component';
import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
  { path: '', redirectTo: 'credit', pathMatch: 'full' },
  {
    path: '', component: ExpensesComponent,

    children: [
      { path: 'cash', component: ExpensesCashComponent },
      { path: 'debit', component: ExpensesDebitComponent },
      { path: 'credit', component: ExpensesCreditComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
