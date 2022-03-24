import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditComponent } from '@home/credit/credit.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { CreditRoutingModule } from './credit.routing';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { ModalAddExpensesComponent } from './expenses/modal-add-expenses/modal-add-expenses.component';
import { ListLoansComponent } from './loans/list-loans/list-loans.component';
import { ModalDetailsLoansComponent } from './loans/modal-details-loans/modal-details-loans.component';
import { ModalLoansComponent } from './loans/modal-loans/modal-loans.component';
import { CalculateService } from './shared/service/calculate.service';
import { CreditService } from './shared/service/credit.service';
import { ExpensesService } from './shared/service/expenses.service';
import { SkeletonComponent } from './shared/skeleton/skeleton.component';

@NgModule({
  declarations: [
    CreditComponent,
    SkeletonComponent,
    ListExpensesComponent,
    ModalAddExpensesComponent,
    ModalDetailsLoansComponent,
    ListLoansComponent,
    ModalLoansComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    CreditService,
    CalculateService,
    ExpensesService
  ]
})
export class CreditModule { }
