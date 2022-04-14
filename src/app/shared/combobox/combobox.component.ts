import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICombobox } from './model/combobox.interface';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true
    }]
})

export class ComboboxComponent implements ControlValueAccessor {

  @Input() items: Array<ICombobox>;
  @Input() label: string;

  value = new FormControl();
  onChange: (event) => void;
  onTouched: () => void;

  writeValue(item: any): void {
    this.value.patchValue(item);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const state = isDisabled ? 'disable' : 'enable';
    this.value[state]();
  }

  setChange(event: any): void {
    this.onTouched();
    this.onChange(event.detail.value);
  }

  compareWith(list: ICombobox, value: ICombobox): boolean {
    return list && value ? list.id === value.id : list === value;
  }

}
