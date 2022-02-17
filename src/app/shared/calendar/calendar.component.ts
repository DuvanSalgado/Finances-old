import { Component, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
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
  value: string;
  maxDate = format(new Date(), 'yyyy-MM-dd');
  minDate = format(new Date(), 'yyyy-MM');

  onChange: (event) => void;
  onTouched: () => void;

  writeValue(obj: string): void {
    this.value = obj;
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
    this.value = this.formatDate(value);
    this.onTouched();
    this.onChange(parseISO(value).getMonth());
  }

  private formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
}
