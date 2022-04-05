import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { SearchService } from '../shared/service/search.service';
import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history.routing';

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
