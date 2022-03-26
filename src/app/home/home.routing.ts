import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MotoComponent } from './moto/moto.component';

const routes: Routes = [
  { path: '', redirectTo: 'credit', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'credit',
        loadChildren: () => import('./credit/credit.module').then(m => m.CreditModule)
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
