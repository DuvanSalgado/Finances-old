import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@app/core/services/loading.service';
import { CalculateService } from '@credit/service/calculate.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IcashGeneral, ITotal } from '../shared/model/credit.interface';
import { InicTotal } from '../shared/model/initTotal';
import { ModalCashComponent } from './modal-cash/modal-cash.component';

@Component({
  selector: 'app-general-total',
  templateUrl: './general-total.component.html',
  styleUrls: ['./general-total.component.scss'],
})
export class GeneralTotalComponent implements OnInit, OnDestroy {

  public currentMonth = new Date().getMonth();
  public total: ITotal = new InicTotal().total;
  public cashGeneral: IcashGeneral = { value: 0, id: null };

  private subscription: Subscription;
  private blockModal = true;

  constructor(
    private calculateService: CalculateService,
    private modalController: ModalController,
    private loadingService: LoadingService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getData(this.currentMonth);
  }

  public valueChanges(month: number): void {
    this.total = new InicTotal().total;
    this.getData(month);
  }

  public async openConsignmentModal(): Promise<void> {
    if (this.blockModal) {
      this.blockModal = false;
      const modal = await this.modalController.create({
        component: ModalCashComponent,
        cssClass: 'cash-modal',
        backdropDismiss: false,
        componentProps: { cashGeneral: this.cashGeneral }
      });
      await modal.present();
      this.blockModal = await (await modal.onWillDismiss()).data;
    }
  }

  private async getData(month: number): Promise<void> {
    await this.loadingService.presentLoading();
    this.subscription = this.calculateService.getAll(month)
      .subscribe((data) => {
        if (data.length > 0) this.total = data[0];
      });

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((cash) => {
        if (cash.length > 0) this.cashGeneral = cash[0];
        this.loadingService.dismiss();
      }));
  }

}
