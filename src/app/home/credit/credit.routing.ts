import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit.component';

const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  {
    path: '', component: CreditComponent,

    children: [
      {
        path: 'expenses',
        loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule)
      },
      {
        path: 'loans',
        loadChildren: () => import('./loans/loans.module').then(m => m.LoansModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./general-total/general-total.module').then(m => m.GeneralTotalModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRoutingModule { }
