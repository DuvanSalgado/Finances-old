import { Component, OnDestroy, OnInit } from '@angular/core';
import { IcashGeneral, IcreditModel, ITotal } from '@credit/model/credit.interface';
import { CalculateService } from '@credit/service/calculate.service';
import { CreditService } from '@credit/service/credit.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { InicTotal } from '../shared/model/initTotal';
import { ModalDetailsLoansComponent } from './modal-details-loans/modal-details-loans.component';
import { ModalLoansComponent } from './modal-loans/modal-loans.component';

@Component({
  selector: 'app-loans',
  templateUrl: 'loans.component.html',
  styleUrls: ['loans.component.scss'],
})
export class LoansComponent implements OnInit, OnDestroy {

  public loans: Array<IcreditModel> = [];
  public loading = true;
  public disableButton = false;
  public disableButtonMont = false;
  public currentMonth = new Date().getMonth();

  private cashGeneral: IcashGeneral = { value: 0 };
  private month = new Date().getMonth();
  private total: ITotal = new InicTotal().total;
  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private creditService: CreditService,
    private calculateService: CalculateService,
  ) { }

  public ngOnInit(): void {
    this.getData(this.currentMonth);
  }

  public ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  public async view(data: IcreditModel): Promise<void> {
    this.disableButton = true;
    const modal = await this.modalController.create({
      component: ModalDetailsLoansComponent,
      cssClass: 'view-modal',
      backdropDismiss: false,
      componentProps: { data }
    });
    await modal.present();
    this.disableButton = await (await modal.onWillDismiss()).data;
  }

  public openModalCreate(): void {
    this.openModal(null, 'Registrar un prestamo', true);
  }

  public update(data: IcreditModel): void {
    this.openModal(data, 'Actualización de datos', false);
  }

  public valueChanges(month: number): void {
    this.currentMonth = month;
    this.disableButtonMont = this.month !== month;
    this.getData(month);
  }

  private getData(month: number): void {
    this.subscription = this.creditService.getAllCredit(month)
      .subscribe((data) => { this.loading = false; this.loans = data; });

    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((data) => { if (data.length > 0) { this.cashGeneral = data[0]; } }));
  }

  private async openModal(data: IcreditModel, title: string, isCreate: boolean): Promise<void> {
    this.disableButton = true;
    const modal = await this.modalController.create({
      component: ModalLoansComponent,
      cssClass: (isCreate) ? 'loans-modal-create' : 'loans-modal-edit',
      backdropDismiss: false,
      componentProps:
        { data, isCreate, title, total: this.total, month: this.currentMonth, cashGeneral: this.cashGeneral }
    });
    await modal.present();
    this.disableButton = await (await modal.onWillDismiss()).data;
  }

}
