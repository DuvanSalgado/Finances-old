import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { IonicModule } from '@ionic/angular';
import { CreditComponent } from './credit/credit.component';
import { MotoComponent } from './moto/moto.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreditComponent,
    MotoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class HomeModule { }
