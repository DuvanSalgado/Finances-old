import { Component, OnDestroy, OnInit } from '@angular/core';
import { IcreditModel, ITotal } from '@credit/model/credit.interface';
import { CalculateService } from '@credit/service/calculate.service';
import { CreditService } from '@credit/service/credit.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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

  private total: ITotal = {
    expenseCredit: 0,
    loanCredit: 0,
    cash: 0,
    paidCredit: 0,
    pendingCredit: 0,
    expenseDebit: 0,
    paidDebit: 0,
    pendingDebit: 0,
    loanDebit: 0,
    expenseCash: 0,
  };
  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private creditService: CreditService,
    private calculateService: CalculateService,
  ) { }

  public ngOnInit(): void {
    this.getdata();
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
    this.openModal(null, 'Crear un nuevo registro', true);
  }

  public update(data: IcreditModel): void {
    this.openModal(data, 'Actualización de datos', false);
  }

  private getdata(): void {
    this.subscription = this.creditService.getAllCredit()
      .subscribe((data) => { this.loading = false; this.loans = data; });

    this.subscription.add(this.calculateService.getAll()
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));
  }

  private async openModal(data: IcreditModel, title: string, isCreate: boolean): Promise<void> {
    this.disableButton = true;
    const modal = await this.modalController.create({
      component: ModalLoansComponent,
      cssClass: (isCreate) ? 'loans-modal-create' : 'loans-modal-edit',
      backdropDismiss: false,
      componentProps: { data, isCreate, title, total: this.total }
    });
    await modal.present();
    this.disableButton = await (await modal.onWillDismiss()).data;
  }

}
