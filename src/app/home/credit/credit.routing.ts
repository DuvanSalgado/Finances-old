import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit.component';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { GeneralTotalComponent } from './general-total/general-total.component';
import { HistoryComponent } from './history/history.component';
import { ListLoansComponent } from './loans/list-loans/list-loans.component';

const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  {
    path: '', component: CreditComponent,

    children: [
      { path: 'expenses', component: ListExpensesComponent },
      { path: 'loans', component: ListLoansComponent },
      { path: 'general', component: GeneralTotalComponent },
      { path: 'history', component: HistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRoutingModule { }
