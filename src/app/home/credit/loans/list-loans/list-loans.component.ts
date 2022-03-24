import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IcreditModel, ITotal } from '../../shared/model/credit.interface';
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

  view(data: IcreditModel): void {
    this.openModal(data, 'Vista de detalles', false, true);
  }

  openModalCreate(): void {
    this.openModal(null, 'Crear un nuevo registro', true, false);
  }

  update(data: IcreditModel): void {
    this.openModal(data, 'Actulización de datos', false, false);
  }

  private async openModal(data: IcreditModel, title: string, isCreate: boolean, isView: boolean): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalLoansComponent,
      componentProps: { data, isCreate, isView, title, total: this.total }
    });
    return await modal.present();
  }

}
