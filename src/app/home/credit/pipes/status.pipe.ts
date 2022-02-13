import { Pipe, PipeTransform } from '@angular/core';
import { IcreditModel } from '../model/credit.interface';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: IcreditModel): string {
    return (value.spending) ? 'Gasto' :
      (value.outstanding) ? 'Pendiente' :
        (value.cash) ? 'Efectivo' : '';
  }

}
