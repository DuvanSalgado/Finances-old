import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CalculateService } from '../shared/service/calculate.service';
import { GeneralTotalComponent } from './general-total.component';
import { GeneralTotalRoutingModule } from './general-total.routing';
import { ModalCashComponent } from './modal-cash/modal-cash.component';

@NgModule({
  declarations: [
    GeneralTotalComponent,
    ModalCashComponent
  ],
  imports: [
    CommonModule,
    GeneralTotalRoutingModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    CalculateService
  ]
})
export class GeneralTotalModule { }
