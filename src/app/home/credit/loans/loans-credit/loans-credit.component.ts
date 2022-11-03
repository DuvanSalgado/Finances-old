import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { IcreditModel } from '@credit/model/credit.interface';
import { mensages } from '@credit/model/menssage';
import { CalculateService } from '@credit/service/calculate.service';
import { LoansModel } from '@creditLoans/model/loans.model';
import { LoansService } from '@creditLoans/services/loans.service';

@Component({
  selector: 'app-loans-credit',
  templateUrl: './loans-credit.component.html',
  styleUrls: ['../loans.component.scss'],
})
export class LoansCreditComponent extends LoansModel implements OnInit, OnDestroy {

  constructor(
    private loansService: LoansService,
    private loadingService: LoadingService,
    private calculateService: CalculateService,
    protected modalController: ModalController,
    protected formBuilder: FormBuilder,
  ) {
    super(formBuilder, modalController);
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  public valueChanges(month: number): void {
    this.monthSelect = this.month !== month;
    if (!this.monthSelect) { this.getData(); }
    else { this.getDataMonth(month); }
  }

  public async openModalPayments(data: IcreditModel): Promise<void> {
    await this.getTotal(data.month);
    this.formLoansPayments(data);
    this.disableButton = true;
    await this.openModalPaymentsController();
    this.disableButton = await (await this.modalPayments.onWillDismiss()).data;
    if (this.formGroup.valid) { this.updatePaymentsCredit(); }
    else { this.resetFormPayments(); }
  }

  public async openModalCreate(): Promise<void> {
    this.getTotal(this.month);
    this.formLoansCreate();
    this.formLoansCredit();
    this.disableButton = true;
    await this.openModalCreateController();
    this.disableButton = await (await this.modalCreate.onWillDismiss()).data;
    if (this.formGroup.valid) { this.saveloansCredit(); }
    else { this.resetFormCreate(); }
  }

  public async openModalAddValue(data: IcreditModel): Promise<void> {
    await this.getTotal(data.month);
    this.formLoansAddValue(data);
    this.disableButton = true;
    await this.openModalAddValueController();
    this.disableButton = await (await this.modalAddValue.onWillDismiss()).data;
    if (this.formGroup.valid) { this.addValueCredit(); }
    else { this.resetFormAddValue(); }
  }

  private async updatePaymentsCredit(): Promise<void> {
    this.setHistoryPayment();
    this.patchValuePayments();
    this.operationsPayments();
    this.loadingService.presentLoading();

    try {
      if (this.isCash) { await this.calculateService.cashGeneral(this.cashGeneral); }
      await this.calculateService.calculate(this.total, this.month);
      await this.loansService.updateCredit(this.formGroup.value, 'loansCredit');
      this.loadingService.presentToast(mensages.update);
    } catch (error) {
      this.loadingService.presentToast(error);
    }

    this.resetFormPayments();
    this.loadingService.dismiss();
  }

  private operationsPayments(): void {
    if (this.isCash) { this.cashGeneral.value = this.cashGeneral.value + this.getValue; }
    this.total.pendingCredit = this.total.pendingCredit - this.getValue;
    this.total.paymentCredit = this.total.paymentCredit + this.getValue;
  }

  private async addValueCredit(): Promise<void> {
    this.setHistoryLoan();
    this.patchValueItem();
    this.operations();
    this.loadingService.presentLoading();

    try {
      await this.calculateService.calculate(this.total, this.month);
      await this.loansService.updateCredit(this.formGroup.value, 'loansCredit');
      this.loadingService.presentToast(mensages.update);
    } catch (error) {
      this.loadingService.presentToast(error);
    }

    this.resetFormAddValue();
    this.loadingService.dismiss();

  }

  private getData(): void {
    this.subscription = this.loansService.getAllCredit('loansCredit')
      .subscribe((data) => this.loans = data,
        (error) => this.loadingService.presentToast(error));

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((cash) => {
        if (cash.length > 0) { this.cashGeneral = cash[0]; }
        this.loading = false;
      }, (error) => this.loadingService.presentToast(error)));
  }

  private getDataMonth(month: number): void {
    this.subscription.add(this.loansService.getAllCreditMonth(month, 'loansCredit')
      .subscribe(resp => this.loans = resp));
  }

  private async getTotal(month: number) {
    let dataPromise = await this.calculateService.getAllPromise(month);
    if (dataPromise) { this.total = dataPromise; }
  }

  private async saveloansCredit(): Promise<void> {
    this.setHistoryLoan();
    this.patchValueItem();
    this.operations();
    this.loadingService.presentLoading();

    try {
      await this.calculateService.calculate(this.total, this.month);
      await this.loansService.createLoans(this.formGroup.value, 'loansCredit');
      this.loadingService.presentToast(mensages.successful);
    } catch (error) {
      this.loadingService.presentToast(error);
    }

    this.resetFormCreate();
    this.loadingService.dismiss();
  }

  private formLoansCredit(): void {
    this.formGroup
      .patchValue({
        [this.formCtrl.icon]: { icon: 'card-outline', labelColor: 'warning' },
        [this.formCtrl.type]: 'Credito'
      });
  }

  private operations(): void {
    this.total.pendingCredit = this.total.pendingCredit + this.getValue;
    this.total.totalCredit = this.total.totalCredit + this.getValue;
  }
}
