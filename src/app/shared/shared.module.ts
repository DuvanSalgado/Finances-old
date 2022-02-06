import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    SearchbarComponent,
    CalendarComponent
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
    CalendarComponent
  ]
})
export class SharedModule { }
