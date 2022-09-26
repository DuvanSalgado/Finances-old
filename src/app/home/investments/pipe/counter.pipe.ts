import { Pipe, PipeTransform } from '@angular/core';
import { IInvestments } from '../model/model';

@Pipe({
  name: 'counter'
})
export class CounterPipe implements PipeTransform {

  transform(value: Array<IInvestments>): number {
    let count = 0;
    value.map(data => {
      count = +data.value + count;
    });
    return count;
  }

}
