import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CreditComponent } from '@home/credit/credit.component';
import { CreditRoutingModule } from './credit.routing';

@NgModule({
  declarations: [
    CreditComponent,
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    SharedModule
  ]
})
export class CreditModule { }
