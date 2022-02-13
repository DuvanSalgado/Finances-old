import { Component, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormCalendarCtrl } from '@app/home/core/model/calendar.enum';
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
export class CalendarComponent implements OnInit, ControlValueAccessor {

  @Output() isDisabled = false;
  formGroup: FormGroup;
  formCtrl = FormCalendarCtrl;
  onChange: (event) => void;
  onTouched: () => void;

  constructor(private formbuilder: FormBuilder) { }


  ngOnInit(): void {
    this.initializateForm();
  }

  initializateForm(): void {
    this.formGroup = this.formbuilder.group({
      [this.formCtrl.value]: [null]
    });
  }

  writeValue(obj: any): void {
    this.formGroup.controls[this.formCtrl.value].setValue(obj);
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
    this.formGroup.controls[this.formCtrl.value].setValue(this.formatDate(value));
    this.onTouched();
    this.onChange(parseISO(value).getMonth());
  }

  private formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
}
