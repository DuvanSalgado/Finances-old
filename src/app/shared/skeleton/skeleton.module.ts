import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SkExpensesComponent } from './sk-expenses/sk-expenses.component';
import { SkLoansComponent } from './sk-loans/sk-loans.component';

@NgModule({
  declarations: [
    SkExpensesComponent,
    SkLoansComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SkExpensesComponent,
    SkLoansComponent
  ]
})
export class SkeletonModule { }
