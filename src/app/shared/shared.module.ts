import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddButtonsComponent } from './add-buttons/add-buttons.component';
import { ButtonsActionsComponent } from './buttons-actions/buttons-actions.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { FooterComponent } from './footer/footer.component';
import { SegmentComponent } from './segment/segment.component';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [
    SidebarComponent,
    CalendarComponent,
    ButtonsActionsComponent,
    ComboboxComponent,
    FooterComponent,
    AddButtonsComponent,
    CurrencyInputComponent,
    SegmentComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    CalendarComponent,
    ButtonsActionsComponent,
    ComboboxComponent,
    FooterComponent,
    AddButtonsComponent,
    CurrencyInputComponent,
    SegmentComponent
  ]
})
export class SharedModule { }
