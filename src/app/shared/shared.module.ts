import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ButtonsActionsComponent } from './buttons-actions/buttons-actions.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    SearchbarComponent,
    CalendarComponent,
    ButtonsActionsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    SidebarComponent,
    SearchbarComponent,
    CalendarComponent,
    ButtonsActionsComponent
  ]
})
export class SharedModule { }
