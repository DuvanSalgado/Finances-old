import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonsActionsComponent } from './buttons-actions/buttons-actions.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [

    SidebarComponent,
    SearchbarComponent,
    CalendarComponent,
    ButtonsActionsComponent,
    ComboboxComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports: [

    SidebarComponent,
    SearchbarComponent,
    CalendarComponent,
    ButtonsActionsComponent,
    ComboboxComponent,
    FooterComponent
  ]
})
export class SharedModule { }
