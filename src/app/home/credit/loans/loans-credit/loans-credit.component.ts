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
    this.getData(this.month);
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  public valueChanges(month: number): void {
    this.monthSelect = this.month !== month;
    this.getData(month);
  }

  public async openModalPayments(data: IcreditModel): Promise<void> {
    this.formLoansPayments(data);
    this.disableButton = true;
    this.openModalPaymentsController();
    this.disableButton = await (await this.modalPayments.onWillDismiss()).data;
    if (this.formGroup.valid) { this.updatePaymentsCredit(); }
    else { this.resetFormPayments(); }
  }

  public async openModalCreate(): Promise<void> {
    this.formLoansCreate();
    this.formLoansCredit();
    this.disableButton = true;
    this.openModalCreateController();
    this.disableButton = await (await this.modalCreate.onWillDismiss()).data;
    if (this.formGroup.valid) { this.saveloansCredit(); }
    else { this.resetFormCreate(); }
  }

  public async openModalAddValue(data: IcreditModel): Promise<void> {
    this.formLoansAddValue(data);
    this.disableButton = true;
    this.openModalAddValueController();
    this.disableButton = await (await this.modalAddValue.onWillDismiss()).data;
    if (this.formGroup.valid) { this.addValueCredit(); }
    else { this.resetFormAddValue(); }
  }

  private async updatePaymentsCredit(): Promise<void> {
    this.setHistory('Abono');
    this.patchValuePayments();
    this.operationsPayments();
    this.loadingService.presentLoading();

    if (this.isCash) { await this.calculateService.cashGeneral(this.cashGeneral); }
    await this.calculateService.calculate(this.total, this.month);
    await this.loansService.updateCredit(this.formGroup.value, 'loansCredit');

    this.loadingService.presentToast(mensages.update);
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

    await this.calculateService.calculate(this.total, this.month);
    await this.loansService.updateCredit(this.formGroup.value, 'loansCredit');
    await this.loadingService.presentToast(mensages.update);

    this.resetFormAddValue();
    this.loadingService.dismiss();

  }

  private getData(month: number): void {
    this.subscription = this.loansService.getAllCreditMonth(month, 'loansCredit')
      .subscribe((data) => {
        this.loans = data;
        this.loading = false;
      });

    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((data) => { if (data.length > 0) { this.cashGeneral = data[0]; } }
      ));
  }

  private async saveloansCredit(): Promise<void> {
    this.setHistory('Prestamo');
    this.patchValueItem();
    this.operations();
    this.loadingService.presentLoading();

    await this.calculateService.calculate(this.total, this.month);
    await this.loansService.createLoans(this.formGroup.value, 'loansCredit');

    this.loadingService.presentToast(mensages.successful);
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
