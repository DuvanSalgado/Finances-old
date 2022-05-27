import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoansCashComponent } from './loans-cash/loans-cash.component';
import { LoansCreditComponent } from './loans-credit/loans-credit.component';
import { LoansDebitComponent } from './loans-debit/loans-debit.component';
import { LoansComponent } from './loans.component';

const routes: Routes = [
  { path: '', redirectTo: 'cash', pathMatch: 'full' },
  {
    path: '', component: LoansComponent,
    children: [
      { path: 'cash', component: LoansCashComponent },
      { path: 'credit', component: LoansCreditComponent },
      { path: 'debit', component: LoansDebitComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule { }
