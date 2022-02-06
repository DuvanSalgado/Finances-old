import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CreditComponent } from '@home/credit/credit.component';
import { CreditRoutingModule } from './credit.routing';
import { FormCreditComponent } from './form-credit/form-credit.component';
import { ListCreditComponent } from './list-credit/list-credit.component';

@NgModule({
  declarations: [
    CreditComponent,
    FormCreditComponent,
    ListCreditComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CreditModule { }
