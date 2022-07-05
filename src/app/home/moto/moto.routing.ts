import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotoComponent } from './moto.component';

const routes: Routes = [
  { path: '', component: MotoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MotoRoutingModule { }
