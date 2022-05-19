import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { SkeletonModule } from '@app/shared/skeleton/skeleton.module';
import { CalculateService } from '@credit/service/calculate.service';
import { ExpensesService } from '@app/home/credit/expenses/shared/services/expenses.service';
import { IonicModule } from '@ionic/angular';
import { CashComponent } from './cash/cash.component';
import { ExpensesComponent } from './expenses.component';
import { ExpensesRoutingModule } from './expenses.routing';
import { ModalAddExpensesComponent } from './shared/modal-add-expenses/modal-add-expenses.component';
import { LoadingService } from '@app/core/services/loading.service';

@NgModule({
  declarations: [
    ExpensesComponent,
    ModalAddExpensesComponent,
    CashComponent
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
