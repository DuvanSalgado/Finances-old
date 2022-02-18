import { Component, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICombobox } from './model/combobox.interface';
import { ITEMS } from './model/data.combobox';

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

  @Input() isDisabled = false;

  public value: ICombobox;
  public items = ITEMS;

  onChange: (event) => void;
  onTouched: () => void;

  writeValue(item: any): void {
    this.value = item;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;;
  }

  setChange(event: any) {
    this.onTouched();
    this.onChange(event.detail.value);
  }

  compareWith(list: ICombobox, value: ICombobox): boolean {
    return list && value ? list.id === value.id : list === value;
  }

}
