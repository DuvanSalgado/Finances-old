import { Component, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements ControlValueAccessor {

  @Output() isDisabled = false;
  value = new FormControl();
  maxDate = format(new Date(), 'yyyy-MM-dd');
  minDate = format(new Date(), 'yyyy-MM');

  onChange: (event) => void;
  onTouched: () => void;

  writeValue(obj: string): void {
    this.value.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setChange(value: string): void {
    this.value.patchValue(this.formatDate(value));
    this.onTouched();
    this.onChange(this.formatDate(value));
  }

  private formatDate(value: string): string {
    return format(new Date(value), 'dd MM yyyy');
  }
}
