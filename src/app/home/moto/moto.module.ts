import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotoComponent } from './moto.component';
import { MotoRoutingModule } from './moto.routing';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { MotoModalAddComponent } from './moto-modal-add/moto-modal-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MotoService } from './shared/services/moto.service';
import { LoadingService } from '@app/core/services/loading.service';

@NgModule({
  declarations: [
    MotoComponent,
    MotoModalAddComponent
  ],
  imports: [
    CommonModule,
    MotoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule
  ],
  providers:[
    MotoService,
    LoadingService
  ]
})
export class MotoModule { }
