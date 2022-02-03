import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './credit/credit.component';
import { HomeComponent } from './home.component';
import { MotoComponent } from './moto/moto.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'credit',
        component: CreditComponent
      },
      {
        path: 'moto',
        component: MotoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
