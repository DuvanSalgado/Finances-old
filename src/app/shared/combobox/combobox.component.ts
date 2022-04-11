import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICombobox } from './model/combobox.interface';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true
    }]
})

export class ComboboxComponent implements ControlValueAccessor {

  @Input() isDisabled = false;
  @Input() items: Array<ICombobox>;
  @Input() label: string;

  public value: ICombobox;

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

  setChange(event: any): void {
    this.onTouched();
    this.onChange(event.detail.value);
  }

  compareWith(list: ICombobox, value: ICombobox): boolean {
    return list && value ? list.id === value.id : list === value;
  }

}
