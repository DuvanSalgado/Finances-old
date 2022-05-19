import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashComponent } from './cash/cash.component';
import { CreditComponent } from './credit/credit.component';
import { DebitComponent } from './debit/debit.component';
import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
  {
    path: '', component: ExpensesComponent,

    children: [
      { path: 'cash', component: CashComponent },
      { path: 'debit', component: DebitComponent },
      { path: 'credit', component: CreditComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
