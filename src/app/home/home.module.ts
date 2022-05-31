import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '@app/core/guard/auth.guard';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { MotoComponent } from './moto/moto.component';

@NgModule({
  declarations: [
    HomeComponent,
    MotoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard]
})
export class HomeModule { }
