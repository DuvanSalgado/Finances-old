import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public cashGeneral: IcashGeneral;

  private subscription: Subscription;
  private blockModal = true;

  constructor(
    private calculateService: CalculateService,
    private modalController: ModalController,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getData(this.currentMonth);
  }

  public valueChanges(month: number): void {
    this.getData(month);
  }

  public async openConsignmentModal(): Promise<void> {
    if (this.blockModal) {
      const modal = await this.modalController.create({
        component: ModalCashComponent,
        cssClass: 'cash-modal',
        backdropDismiss: false,
        componentProps: { data: this.cashGeneral }
      });
      await modal.present();
      this.blockModal = false;
      this.blockModal = await (await modal.onWillDismiss()).data;
    }
  }

  private getData(month: number): void {
    this.subscription = this.calculateService.getAll(month)
      .subscribe((data) => this.total = data[0]);

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((data) => this.cashGeneral = data[0]));
  }

}
