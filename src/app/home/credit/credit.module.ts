import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditComponent } from '@home/credit/credit.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { CreditRoutingModule } from './credit.routing';
import { ListCreditComponent } from './list-credit/list-credit.component';
import { ModalFormCreditComponent } from './modal-form-credit/form-credit.component';
import { CreditService } from './shared/service/credit.service';
import { SkeletonComponent } from './shared/skeleton/skeleton.component';
import { ViewHistoryComponent } from './view-history/view-history.component';

@NgModule({
  declarations: [
    CreditComponent,
    ModalFormCreditComponent,
    ListCreditComponent,
    ViewHistoryComponent,
    SkeletonComponent
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
