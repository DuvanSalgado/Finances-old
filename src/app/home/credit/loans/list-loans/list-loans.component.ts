import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IcreditModel, ITotal } from '../../shared/model/credit.interface';
import { ModalDetailsLoansComponent } from '../modal-details-loans/modal-details-loans.component';
import { ModalLoansComponent } from '../modal-loans/modal-loans.component';

@Component({
  selector: 'app-list-loans',
  templateUrl: './list-loans.component.html',
  styleUrls: ['./list-loans.component.scss'],
})
export class ListLoansComponent {

  @Input() loans: Array<IcreditModel> = [];
  @Input() total: Array<ITotal>;
  @Input() loading = false;

  constructor(private modalController: ModalController) { }

  async view(data: IcreditModel): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalDetailsLoansComponent,
      componentProps: { data }
    });
    return await modal.present();
  }

  openModalCreate(): void {
    this.openModal(null, 'Crear un nuevo registro', true);
  }

  update(data: IcreditModel): void {
    this.openModal(data, 'Actulización de datos', false);
  }

  private async openModal(data: IcreditModel, title: string, isCreate: boolean): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalLoansComponent,
      componentProps: { data, isCreate, title, total: this.total }
    });
    return await modal.present();
  }

}
