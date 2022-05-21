import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ExpensesService } from '@app/home/credit/expenses/shared/services/expenses.service';
import { SharedModule } from '@app/shared/shared.module';
import { SkeletonModule } from '@app/shared/skeleton/skeleton.module';
import { CalculateService } from '@credit/service/calculate.service';
import { IonicModule } from '@ionic/angular';
import { ExpensesCashComponent } from './expenses-cash/expenses-cash.component';
import { ExpensesCreditComponent } from './expenses-credit/expenses-credit.component';
import { ExpensesDebitComponent } from './expenses-debit/expenses-debit.component';
import { ExpensesComponent } from './expenses.component';
import { ExpensesRoutingModule } from './expenses.routing';
import { ExpensesListComponent } from './shared/expenses-list/expenses-list.component';
import { ModalAddExpensesComponent } from './shared/modal-add-expenses/modal-add-expenses.component';

@NgModule({
  declarations: [
    ExpensesComponent,
    ModalAddExpensesComponent,
    ExpensesCashComponent,
    ExpensesCreditComponent,
    ExpensesDebitComponent,
    ExpensesListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ExpensesRoutingModule,
    SharedModule,
    SkeletonModule
  ],
  providers: [
    ExpensesService,
    CalculateService,
    LoadingService
  ]
})
export class ExpensesModule { }
