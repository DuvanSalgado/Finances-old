import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CreditComponent } from '@home/credit/credit.component';
import { CreditRoutingModule } from './credit.routing';
import { ModalFormCreditComponent } from './modal-form-credit/form-credit.component';
import { ListCreditComponent } from './list-credit/list-credit.component';
import { CreditService } from './service/credit.service';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    CreditComponent,
    ModalFormCreditComponent,
    ListCreditComponent,
    StatusPipe
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
