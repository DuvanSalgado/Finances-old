import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: 'credit/expenses', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'credit',
        loadChildren: () => import('./credit/credit.module').then(m => m.CreditModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'moto',
        loadChildren: () => import('./moto/moto.module').then(m => m.MotoModule)
      },
      {
        path: 'investments',
        loadChildren: () => import('./investments/investments.module').then(m => m.InvestmentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
