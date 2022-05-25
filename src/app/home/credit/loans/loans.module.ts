import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { LoansService } from '@app/home/credit/loans/shared/services/loans.service';
import { SharedModule } from '@app/shared/shared.module';
import { SkeletonModule } from '@app/shared/skeleton/skeleton.module';
import { CalculateService } from '@credit/service/calculate.service';
import { IonicModule } from '@ionic/angular';
import { LoansCashComponent } from './loans-cash/loans-cash.component';
import { LoansComponent } from './loans.component';
import { LoansRoutingModule } from './loans.routing';
import { LoansModalCreateComponent } from './shared/loans-modal-create/loans-modal-create.component';
import { LoansModalAddValueComponent } from './shared/loans-modal-add-value/loans-modal-add-value.component';
import { LoansModalPaymentsComponent } from './shared/loans-modal-payments/loans-modal-payments.component';
import { LoansModalDetailsComponent } from './shared/loans-modal-details/loans-modal-details.component';

@NgModule({
  declarations: [
    LoansComponent,
    LoansModalDetailsComponent,
    LoansCashComponent,
    LoansModalCreateComponent,
    LoansModalPaymentsComponent,
    LoansModalAddValueComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    SkeletonModule
  ],
  providers: [
    LoansService,
    LoadingService,
    CalculateService
  ]
})
export class LoansModule { }
