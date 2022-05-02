import { Component, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyInputComponent),
    multi: true
  }
  ]
})
export class CurrencyInputComponent implements ControlValueAccessor {

  private static backspaceKey = 'Backspace';
  public valueForm = new FormControl();
  public valuePipe = '';
  onChange: (event) => void;
  onTouched: () => void;

  @HostListener('ionBlur', ['$event']) blurEvent() {
    if (this.valuePipe !== '') {
      this.valueForm.patchValue('.00');
    } else {
      this.clearInput();
    }
  }

  @HostListener('ionFocus', ['$event']) focusEvent(event) {
    this.clearInput();
  }
  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  changeInput(event: any): void {
    this.clearInput();
    if (event.detail.data && !isNaN(event.detail.data)) {
      this.addDigit(event.detail.data);
    }
  }

  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === CurrencyInputComponent.backspaceKey) {
      this.delDigit();
    }
  }

  private addDigit(key: string): void {
    this.valuePipe = this.valuePipe + key;
    this.onChange(this.valuePipe);
  }

  private delDigit(): void {
    this.valuePipe = this.valuePipe.substring(0, this.valuePipe.length - 1);
    this.onChange(this.valuePipe);
  }

  private clearInput(): void {
    this.valueForm.patchValue(null);
  }

}
