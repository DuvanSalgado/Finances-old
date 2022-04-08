import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddButtonsComponent } from './add-buttons/add-buttons.component';
import { ButtonsActionsComponent } from './buttons-actions/buttons-actions.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [
    SidebarComponent,
    CalendarComponent,
    ButtonsActionsComponent,
    ComboboxComponent,
    FooterComponent,
    AddButtonsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    CalendarComponent,
    ButtonsActionsComponent,
    ComboboxComponent,
    FooterComponent,
    AddButtonsComponent
  ]
})
export class SharedModule { }
