import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CalculateService } from '../shared/service/calculate.service';
import { CreditService } from '../shared/service/credit.service';
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
    SharedModule
  ],
  providers: [
    CreditService,
    CalculateService
  ]
})
export class LoansModule { }
