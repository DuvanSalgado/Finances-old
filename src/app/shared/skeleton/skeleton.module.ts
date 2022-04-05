import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkExpensesComponent } from './sk-expenses/sk-expenses.component';
import { IonicModule } from '@ionic/angular';
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
