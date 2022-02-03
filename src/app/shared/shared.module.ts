import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
