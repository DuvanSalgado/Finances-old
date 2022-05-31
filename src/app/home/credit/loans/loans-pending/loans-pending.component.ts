import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { IcreditModel } from '../../shared/model/credit.interface';
import { mensages } from '../../shared/model/menssage';
import { CalculateService } from '../../shared/service/calculate.service';
import { LoansModel } from '../shared/model/loans.model';
import { LoansService } from '../shared/services/loans.service';

@Component({
  selector: 'app-loans-pending',
  templateUrl: './loans-pending.component.html',
  styleUrls: ['../loans.component.scss'],
})
export class LoansPendingComponent extends LoansModel implements OnInit, OnDestroy {

  constructor(
    private loansService: LoansService,
    private loadingService: LoadingService,
    private calculateService: CalculateService,
    protected modalController: ModalController,
    protected formBuilder: FormBuilder,
  ) {
    super(formBuilder, modalController);
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.getData(this.month);
  }

  public async openModalPaymentsPending(data: IcreditModel): Promise<void> {
    this.formLoansPayments(data);
    this.disableButton = true;
    await this.openModalPaymentsController();
    this.disableButton = await (await this.modalPayments.onWillDismiss()).data;
    if (this.formGroup.valid) { this.updatePaymentsPending(); }
    else { this.resetFormPayments(); }
  }

  private async updatePaymentsPending(): Promise<void> {
    this.setHistory('Abono');
    this.patchValuePayments();
    if (this.isCash) { this.cashGeneral.value = this.cashGeneral.value + this.getValue; }

    await this.loadingService.presentLoading();
    if (this.isCash) { await this.calculateService.cashGeneral(this.cashGeneral); }
    await this.loansService.updateCredit(this.formGroup.value, 'loansCash');
    await this.loadingService.presentToast(mensages.update);
    this.resetFormPayments();
    await this.loadingService.dismiss();
  }

  private getData(month: number): void {
    this.subscription = (this.loansService.getAllCreditPending(month, 'loansCash')
      .subscribe((data) => {
        this.loansPending = [];
        data.forEach(element => {
          if (element.month !== month) { this.loansPending.push(element); }
        });
        this.loading = false;
      }));

      this.subscription.add(this.calculateService.getAllCash()
      .subscribe((data) => { this.loading = false; if (data.length > 0) { this.cashGeneral = data[0]; } }
      ));
  }

}
