import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditComponent } from '@home/credit/credit.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { CreditRoutingModule } from './credit.routing';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { ModalAddExpensesComponent } from './expenses/modal-add-expenses/modal-add-expenses.component';
import { ModalFormCreditComponent } from './modal-form-credit/form-credit.component';
import { CreditService } from './shared/service/credit.service';
import { SkeletonComponent } from './shared/skeleton/skeleton.component';
import { ViewHistoryComponent } from './view-history/view-history.component';

@NgModule({
  declarations: [
    CreditComponent,
    ModalFormCreditComponent,
    ViewHistoryComponent,
    SkeletonComponent,
    ListExpensesComponent,
    ModalAddExpensesComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    CreditService
  ]
})
export class CreditModule { }
