import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history.routing';
import { HistoryComponent } from './history.component';
import { SearchService } from '../shared/service/search.service';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    SearchService
  ]
})
export class HistoryModule { }
