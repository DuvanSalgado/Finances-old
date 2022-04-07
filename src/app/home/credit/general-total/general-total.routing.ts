import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralTotalComponent } from './general-total.component';

const routes: Routes = [
  { path: '', component: GeneralTotalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralTotalRoutingModule { }
