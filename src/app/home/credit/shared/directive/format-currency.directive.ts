import { CurrencyPipe } from '@angular/common';
import { Directive, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormatCurrency]',
  providers: [CurrencyPipe]
})
export class FormatCurrencyDirective {

  constructor(
    @Self() private ngControl: NgControl,
    private currencyPipe: CurrencyPipe
  ) { }

  @HostListener('keyup', ['$event']) keyEvent(event) {
    const valueForm = this.ngControl.control.value;
    if (valueForm && !this.validarLetra(event.key)) {
      const valueNoFormat = valueForm.replace(/[$,]/g, '');
      const valueTransform = this.currencyPipe.transform(valueNoFormat, 'COP', 'symbol-narrow', '1.0-0');
      this.ngControl.control.setValue(valueTransform);
    }
  }

  private validarLetra(caracter): boolean {
    const ascii = caracter.toUpperCase().charCodeAt(0);
    return (ascii > 64 && ascii < 91) && ascii !== 66;
  };

}
