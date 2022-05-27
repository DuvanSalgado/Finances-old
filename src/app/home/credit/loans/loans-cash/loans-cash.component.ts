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
  selector: 'app-loans-cash',
  templateUrl: './loans-cash.component.html',
  styleUrls: ['../loans.component.scss'],
})
export class LoansCashComponent extends LoansModel implements OnInit, OnDestroy {

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

  valueChanges(fdsf: any) {

  }

  public async openModalPaymentsCash(data: IcreditModel): Promise<void> {
    this.formLoansPayments(data);
    this.disableButton = true;
    await this.openModalPaymentsController();
    this.disableButton = await (await this.modalPayments.onWillDismiss()).data;
    if (this.formGroup.valid) { this.updatePaymentsCash(); }
    else { this.resetFormPayments(); }

  }

  public async openModalAddValue(data: IcreditModel): Promise<void> {
    this.formLoansAddValue(data);
    this.disableButton = true;
    await this.openModalAddValueController();
    this.disableButton = await (await this.modalAddValue.onWillDismiss()).data;
    if (this.formGroup.valid) { this.addValueCash(); }
    else { this.resetFormAddValue(); }
  }

  public async openModalCreate(): Promise<void> {
    this.formLoansCreate();
    this.formLoansCash();
    this.disableButton = true;
    await this.openModalCreateController();
    this.disableButton = await (await this.modalCreate.onWillDismiss()).data;
    if (this.formGroup.valid) { this.saveloansCash(); }
    else { this.resetFormCreate(); }
  }

  private async addValueCash(): Promise<void> {
    this.setHistory('Prestamo');
    this.patchValueItem();
    this.operations();
    await this.loadingService.presentLoading();

    await this.calculateService.calculate(this.total, this.month);
    await this.calculateService.cashGeneral(this.cashGeneral);
    await this.loansService.updateCredit(this.formGroup.value, 'loansCash');
    await this.loadingService.presentToast(mensages.successful);

    this.resetFormAddValue();
    await this.loadingService.dismiss();

  }

  private async saveloansCash(): Promise<void> {
    this.setHistory('Prestamo');
    this.patchValueItem();
    this.operations();
    await this.loadingService.presentLoading();
    await this.calculateService.calculate(this.total, this.month);
    await this.calculateService.cashGeneral(this.cashGeneral);
    await this.loansService.createLoans(this.formGroup.value, 'loansCash');

    await this.loadingService.presentToast(mensages.successful);
    this.resetFormCreate();
    await this.loadingService.dismiss();
  }

  private async updatePaymentsCash(): Promise<void> {
    this.setHistory('Abono');
    this.patchValuePayments();
    this.operationsPayments();

    await this.loadingService.presentLoading();
    if (this.isCash) { await this.calculateService.cashGeneral(this.cashGeneral); }
    await this.calculateService.calculate(this.total, this.month);
    await this.loansService.updateCredit(this.formGroup.value, 'loansCash');
    await this.loadingService.presentToast(mensages.successful);
    this.resetFormPayments();
    await this.loadingService.dismiss();
  }

  private getData(month: number): void {
    this.subscription = this.loansService.getAllCreditMonth(month, 'loansCash')
      .subscribe((data) => {
        this.loans = data;
      });

    this.subscription.add(this.loansService.getAllCreditPending(month, 'loansCash')
      .subscribe((data) => {
        data.forEach(element => {
          if (element.month !== month) { this.loans.unshift(element); }
        });
      }));

    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((data) => { this.loading = false; if (data.length > 0) { this.cashGeneral = data[0]; } }
      ));
  }

  private operationsPayments(): void {
    if (this.isCash) { this.cashGeneral.value = this.cashGeneral.value + this.getValue; }
    this.total.pendingCash = this.total.pendingCash - this.getValue;
    this.total.paymentCash = this.total.paymentCash + this.getValue;
  }

  private operations(): void {
    this.total.pendingCash = this.total.pendingCash + this.getValue;
    this.cashGeneral.value = this.cashGeneral.value - this.getValue;
  }

  private formLoansCash(): void {
    this.formGroup
      .patchValue({
        [this.formCtrl.icon]: { icon: 'cash-outline', labelColor: 'success' },
        [this.formCtrl.type]: 'Efectivo'
      });
  }

}
