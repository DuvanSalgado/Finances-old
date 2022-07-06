import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@app/core/guard/auth.guard';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HomeRoutingModule,
    SharedModule,
  ],
  providers: [AuthGuard]
})
export class HomeModule { }
