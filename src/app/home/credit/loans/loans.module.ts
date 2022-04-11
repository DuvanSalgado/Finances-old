import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { SkeletonModule } from '@app/shared/skeleton/skeleton.module';
import { CalculateService } from '@credit/service/calculate.service';
import { CreditService } from '@credit/service/credit.service';
import { IonicModule } from '@ionic/angular';
import { LoansComponent } from './loans.component';
import { LoansRoutingModule } from './loans.routing';
import { ModalDetailsLoansComponent } from './modal-details-loans/modal-details-loans.component';
import { ModalLoansComponent } from './modal-loans/modal-loans.component';

@NgModule({
  declarations: [
    LoansComponent,
    ModalDetailsLoansComponent,
    ModalLoansComponent
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
    CreditService,
    CalculateService
  ]
})
export class LoansModule { }
