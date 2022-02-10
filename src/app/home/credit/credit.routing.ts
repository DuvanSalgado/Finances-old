import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit.component';
import { ListCreditComponent } from './list-credit/list-credit.component';

const routes: Routes = [
  {
    path: '',
    component: CreditComponent,
    children: [
      { path: '', component: ListCreditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRoutingModule { }
