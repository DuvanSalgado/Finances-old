import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModaltotalComponent } from '@app/home/credit/modaltotal/modaltotal.component';
import { ITotal } from '@app/home/credit/shared/model/credit.interface';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnChanges {

  @Input() total: ITotal;

  constructor(private modalController: ModalController) { }

  ngOnChanges({ total }: SimpleChanges): void {
    this.total = total.currentValue;
  }

  public async openModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ModaltotalComponent,
      componentProps: { total: this.total }
    });
    return await modal.present();
  }
}
