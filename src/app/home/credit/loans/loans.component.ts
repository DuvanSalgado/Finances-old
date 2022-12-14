import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IcashGeneral, IcreditModel, ITotal } from '../shared/model/credit.interface';
import { InicTotal } from '../shared/model/initTotal';
import { mensages } from '../shared/model/menssage';
import { CalculateService } from '../shared/service/calculate.service';
import { OperationCash } from './operation/operation-cash';
import { OperationCredit } from './operation/operation-credit';
import { OperationDebit } from './operation/operation-debit';
import { LoansModalAddValueComponent } from './shared/loans-modal-add-value/loans-modal-add-value.component';
import { LoansModalCreateComponent } from './shared/loans-modal-create/loans-modal-create.component';
import { LoansModalDetailsComponent } from './shared/loans-modal-details/loans-modal-details.component';
import { LoansModalPaymentsComponent } from './shared/loans-modal-payments/loans-modal-payments.component';
import { LoansFormModel } from './shared/model/loans-form.model';
import { LoansService } from './shared/services/loans.service';

@Component({
  selector: 'app-loans',
  templateUrl: 'loans.component.html',
  styleUrls: ['loans.component.scss'],
})
export class LoansComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public month = new Date().getMonth();
  public loading = false;
  public disableButton = false;
  public loans: Array<IcreditModel> = [];
  public query: string = null;
  public cashGeneral: IcashGeneral = { id: null, value: 0 };
  private loansAll: Array<IcreditModel> = [];
  private total: ITotal = new InicTotal().total;

  constructor(
    private loansService: LoansService,
    private loadingService: LoadingService,
    private calculateService: CalculateService,
    public operationCash: OperationCash,
    public operationCredit: OperationCredit,
    public operationDebit: OperationDebit,
    private modalController: ModalController
  ) { }


  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.getData();
  }

  public onSearchLoan(event): void {
    this.query = event.target.value.toLowerCase();
    if (this.query) this.loans = this.loansAll.filter((loan) => loan.name.toLowerCase().indexOf(this.query) > -1);
    else this.loans = this.filterMont(this.loansAll);
  }

  public async openModalCreate(operation: LoansFormModel): Promise<void> {
    await this.getTotal(this.month);
    operation.initializeFormLoansCreate();
    operation.patchFormLoans();
    this.openModalCreateController(operation);
  }

  public async openModalPayments(data: IcreditModel): Promise<void> {
    this.disableButton = true;
    await this.getTotal(data.month);
    this.operationCash.formLoansPayments(data);
    await this.openModalPaymentsController();
  }

  public async openModalAddValue(data: IcreditModel, operation: LoansFormModel): Promise<void> {
    await this.getTotal(data.month);
    operation.formLoansAddValue(data);
    operation.patchFormLoans();
    await this.openModalAddValueController(operation);
  }

  public async openModalViewDetails(data: IcreditModel): Promise<void> {
    const modalView = await this.modalController.create({
      component: LoansModalDetailsComponent,
      cssClass: 'view-modal',
      backdropDismiss: false,
      componentProps: { data }
    });
    await modalView.present();
    await (await modalView.onWillDismiss()).data;
  }

  private async openModalCreateController(operarion: LoansFormModel): Promise<void> {
    const modalCreate = await this.modalController.create({
      component: LoansModalCreateComponent,
      cssClass: 'add-value-modal',
      backdropDismiss: false,
      componentProps: { formGroup: operarion.getFormGroup }
    });
    await modalCreate.present();

    const status = await (await modalCreate.onWillDismiss()).data;
    if (status) {
      operarion.setHistoryLoan(operarion.getValueIcon);
      operarion.patchValueItem();
      operarion.operations(this.total, this.cashGeneral);
      this.saveloan(operarion)
    }
  }

  private async openModalPaymentsController(): Promise<void> {
    const modalPayments = await this.modalController.create({
      component: LoansModalPaymentsComponent,
      cssClass: 'loans-modal-edit',
      backdropDismiss: false,
      componentProps: { formGroup: this.operationCash.getFormGroup }
    });
    await modalPayments.present();
    const status = await (await modalPayments.onWillDismiss()).data;
    if (status) {
      this.operationCash.setHistoryPayment();
      this.operationCash.patchValuePayments();
      this.operationCash.operationsPaymentCash(this.cashGeneral);
      this.updatePayments();
    }
    this.disableButton = false;
  }

  private async openModalAddValueController(operation: LoansFormModel) {
    const modalAddValue = await this.modalController.create({
      component: LoansModalAddValueComponent,
      cssClass: 'add-value-modal',
      backdropDismiss: false,
      componentProps: { formGroup: operation.getFormGroup }
    });
    await modalAddValue.present();

    const status = await (await modalAddValue.onWillDismiss()).data;
    if (status) {
      operation.setHistoryLoan(operation.getValueIcon);
      operation.patchValueItem();
      operation.operations(this.total, this.cashGeneral);
      this.addValueCredit(operation)
    }
  }

  private getData(): void {
    this.loading = true;
    this.subscription = this.calculateService.getAllCash()
      .subscribe((cash) => {
        if (cash.length > 0) { this.cashGeneral = cash[0]; }
      }, (error) => this.loadingService.presentToast(error));

    this.subscription.add(this.loansService.getAllCredit()
      .subscribe((loanCash: IcreditModel[]) => {
        this.loans = this.filterMont(loanCash);
        this.loansAll = loanCash;
        this.loading = false;
      }, (error) => this.loadingService.presentToast(error)));
  }

  private async updatePayments(): Promise<void> {
    this.loadingService.presentLoading();

    try {
      await this.calculateService.cashGeneral(this.cashGeneral);
      await this.loansService.updateCredit(this.operationCash.getFormGroup.value);
    } catch (error) {
      this.loadingService.presentToast(error);
    }

    this.loadingService.presentToast(mensages.update);
    this.loadingService.dismiss();
  }

  private async addValueCredit(operation: LoansFormModel): Promise<void> {
    this.loadingService.presentLoading();

    try {
      await this.calculateService.calculate(this.total, this.month);
      await this.calculateService.cashGeneral(this.cashGeneral);
      await this.loansService.updateCredit(operation.getFormGroup.value);
    } catch (error) {
      this.loadingService.presentToast(error);
    }
    this.loadingService.presentToast(mensages.update);
    this.loadingService.dismiss();
  }

  private async getTotal(month: number): Promise<void> {
    try {
      const dataPromise = await this.calculateService.getAllPromise(month);
      if (dataPromise) { this.total = dataPromise; }
    } catch (error) {
      this.loadingService.presentToast(error);
      throw new Error(error);
    }
  }

  private async saveloan(operation: LoansFormModel): Promise<void> {
    this.loadingService.presentLoading();

    try {
      await this.calculateService.calculate(this.total, this.month);
      await this.calculateService.cashGeneral(this.cashGeneral);
      await this.loansService.createLoans(operation.getFormGroup.value);
    } catch (error) {
      this.loadingService.presentToast(error);
    }

    this.loadingService.presentToast(mensages.successful);
    this.loadingService.dismiss();
  }

  private filterMont = (loanCash: Array<IcreditModel>) =>
    loanCash.filter(item =>
      (item.month === this.month) || (item.month !== this.month && item.pendingValue > 0));

}
