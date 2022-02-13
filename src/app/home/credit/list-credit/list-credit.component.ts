import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFormCreditComponent } from '../modal-form-credit/form-credit.component';
import { IcreditModel } from '../model/credit.interface';
import { CreditService } from '../service/credit.service';

@Component({
  selector: 'app-list-credit',
  templateUrl: './list-credit.component.html',
  styleUrls: ['./list-credit.component.scss'],
})
export class ListCreditComponent implements OnInit {

  data: Array<IcreditModel> = [];

  constructor(
    private modalController: ModalController,
    private creditService: CreditService
  ) { }

  ngOnInit(): void {
    this.creditService.getAllCredit().subscribe((data) => this.data = data);
  }

  update(data: IcreditModel): void {
    this.openModal(data, false);
  }

  create(): void {
    this.openModal(null, true);
  }

  private async openModal(data: IcreditModel, isCreate: boolean): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalFormCreditComponent,
      componentProps: { data, isCreate }
    });
    return await modal.present();
  }
}
