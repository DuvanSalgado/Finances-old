import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITotal } from '@app/home/credit/shared/model/credit.interface';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnChanges {

  @Input() total: ITotal;

  ngOnChanges({ total }: SimpleChanges): void {
    this.total = total.currentValue;
  }

  openModal(): void {
    console.log('ok');
  }
}
