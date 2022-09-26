import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { InvestmentsComponent } from './investments.component';
import { InvestmentsRoutingModule } from './investments.routing';
import { InvestmentsService } from './services/investments.service';
import { CounterPipe } from './pipe/counter.pipe';

@NgModule({
  declarations: [
    InvestmentsComponent,
    CreateModalComponent,
    CounterPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    InvestmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[
    InvestmentsService
  ]
})
export class InvestmentsModule { }
