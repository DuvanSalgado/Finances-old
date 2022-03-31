import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITotal } from '../shared/model/credit.interface';

@Component({
  selector: 'app-modaltotal',
  templateUrl: './modaltotal.component.html',
  styleUrls: ['./modaltotal.component.scss'],
})
export class ModaltotalComponent implements OnChanges {

  @Input() total: ITotal;

  constructor(private modalController: ModalController) { }

  ngOnChanges({ total }: SimpleChanges): void {
    this.total = total.currentValue;
  }

  public cancel(): void {
    this.modalController.dismiss();
  }
}
