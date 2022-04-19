import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatCurrencyDirective } from './format-currency.directive';



@NgModule({
  declarations: [
    FormatCurrencyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatCurrencyDirective
  ]
})
export class DirectiveModule { }
