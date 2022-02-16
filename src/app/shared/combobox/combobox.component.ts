import { Component, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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

  @Output() isDisabled = false;
  value: ICombobox;

  items = [{
    name: 'Selecione',
    id: 0,
  }, {
    name: 'Gasto',
    id: 1,
  },
  {
    name: 'Prestamo',
    id: 2,
  },
  {
    name: 'Efectivo',
    id: 3
  }];


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

  compareWith(o1: ICombobox, o2: ICombobox): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
