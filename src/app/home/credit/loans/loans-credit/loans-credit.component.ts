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
    this.getTotal(this.month);
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
    this.getTotal(this.month);
    this.formLoansAddValue(data);
    this.disableButton = true;
    await this.openModalAddValueController();
    this.disableButton = await (await this.modalAddValue.onWillDismiss()).data;
    if (this.formGroup.valid) { this.addValueCredit(); }
    else { this.resetFormAddValue(); }
  }

  private async updatePaymentsCredit(): Promise<void> {
    this.setHistory('Abono');
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
    this.setHistory('Prestamo');
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
      .subscribe((data) => {
        this.loans = data;

        this.subscription.add(this.calculateService.getAllCash()
          .subscribe((cash) => {
            if (cash.length > 0) { this.cashGeneral = cash[0]; }
            this.loading = false;
          }));
      });
  }

  private getDataMonth(month: number): void {
    this.subscription.add(this.loansService.getAllCreditMonth(month, 'loansDebit')
      .subscribe(resp => this.loans = resp));
  }

  private getTotal(month: number): void {
    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => {
        if (data.length > 0) { this.total = data[0]; }
      }));
  }

  private async saveloansCredit(): Promise<void> {
    this.setHistory('Prestamo');
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
