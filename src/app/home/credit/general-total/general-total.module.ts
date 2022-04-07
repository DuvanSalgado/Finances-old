import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CalculateService } from '../shared/service/calculate.service';
import { GeneralTotalComponent } from './general-total.component';
import { GeneralTotalRoutingModule } from './general-total.routing';

@NgModule({
  declarations: [
    GeneralTotalComponent
  ],
  imports: [
    CommonModule,
    GeneralTotalRoutingModule,
    IonicModule
  ],
  providers: [
    CalculateService
  ]
})
export class GeneralTotalModule { }
