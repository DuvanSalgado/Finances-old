import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalFormCreditComponent } from '../modal-form-credit/form-credit.component';
import { IcreditModel } from '../model/credit.interface';
import { CreditService } from '../service/credit.service';

@Component({
  selector: 'app-list-credit',
  templateUrl: './list-credit.component.html',
  styleUrls: ['./list-credit.component.scss'],
})
export class ListCreditComponent implements OnInit, OnDestroy {

  public data: Array<IcreditModel> = [];
  public loading = true;

  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private creditService: CreditService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getData();
  }

  update(data: IcreditModel): void {
    this.openModal(data, false, false);
  }

  create(): void {
    this.openModal(null, true, false);
  }

  view(data: IcreditModel): void {
    this.openModal(data, false, true);
  }

  private getData(): void {
    this.subscription = this.creditService.getAllCredit()
      .subscribe((data) => { this.loading = false; this.data = data; });
  }

  private async openModal(data: IcreditModel, isCreate: boolean, isView: boolean): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalFormCreditComponent,
      componentProps: { data, isCreate, isView }
    });
    return await modal.present();
  }
}
