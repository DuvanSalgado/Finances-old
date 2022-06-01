import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IcashGeneral, IcreditModel, ITotal } from '@app/home/credit/shared/model/credit.interface';
import { FormCreditCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { InicTotal } from '@app/home/credit/shared/model/initTotal';
import { Status } from '@app/home/credit/shared/model/status.enum';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoansModalCreateComponent } from '../loans-modal-create/loans-modal-create.component';
import { LoansModalAddValueComponent } from '../loans-modal-add-value/loans-modal-add-value.component';
import { LoansModalPaymentsComponent } from '../loans-modal-payments/loans-modal-payments.component';
import { LoansModalDetailsComponent } from '../loans-modal-details/loans-modal-details.component';

export class LoansModel {

  public formCtrl = FormCreditCtrl;
  public formGroup: FormGroup;
  public disableButton: boolean;
  public loading = true;
  public loans: Array<IcreditModel> = [];
  public cashGeneral: IcashGeneral = { id: null, value: 0 };
  public month = new Date().getMonth();

  protected modalCreate: HTMLIonModalElement;
  protected modalAddValue: HTMLIonModalElement;
  protected modalPayments: HTMLIonModalElement;
  protected total: ITotal = new InicTotal().total;
  protected subscription: Subscription;
  protected todayDate = new Date();

  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController
  ) { }

  protected get getValue(): number {
    return parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
  }

  protected get getPendingValue(): number {
    return parseInt(this.formGroup.get(this.formCtrl.pendingValue).value, 10);
  }
  protected get getPaidValue(): number {
    return parseInt(this.formGroup.get(this.formCtrl.paidValue).value, 10);
  }

  protected get getFullValue(): number {
    return parseInt(this.formGroup.get(this.formCtrl.fullValue).value, 10);
  }

  protected get isCash(): boolean {
    return this.formGroup.get(this.formCtrl.paymentMethod).value.id === Status.efectivo;
  }

  public async openModalViewDetails(data: IcreditModel): Promise<void> {
    await this.openModalViewController(data);
  }

  protected formLoansCreate(): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.name]: [null, Validators.required],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.pendingValue]: [0],
      [this.formCtrl.paidValue]: [0],
      [this.formCtrl.fullValue]: [0],
      [this.formCtrl.type]: [null],
      [this.formCtrl.month]: [this.todayDate.getMonth()],
      [this.formCtrl.date]: [this.todayDate],
      [this.formCtrl.paymentMethod]: [null],
      [this.formCtrl.icon]: [null],
      [this.formCtrl.history]: [[]]
    });
  }

  protected formLoansAddValue(data: IcreditModel): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.id]: [data.id],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.pendingValue]: [data.pendingValue],
      [this.formCtrl.fullValue]: [data.fullValue],
      [this.formCtrl.type]: [data.type],
      [this.formCtrl.history]: [data.history]
    });
  }

  protected formLoansPayments(data: IcreditModel): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.id]: [data.id],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0), Validators.max(data.pendingValue)] ],
      [this.formCtrl.pendingValue]: [data.pendingValue],
      [this.formCtrl.paidValue]: [data.paidValue],
      [this.formCtrl.type]: [data.type],
      [this.formCtrl.paymentMethod]: [null, Validators.required],
      [this.formCtrl.history]: [data.history]
    });
  }

  protected async openModalCreateController(): Promise<void> {
    this.modalCreate = await this.modalController.create({
      component: LoansModalCreateComponent,
      cssClass: 'loans-modal-create',
      backdropDismiss: false,
      componentProps: { formGroup: this.formGroup }
    });
    await this.modalCreate.present();
  }

  protected async openModalAddValueController(): Promise<void> {
    this.modalAddValue = await this.modalController.create({
      component: LoansModalAddValueComponent,
      cssClass: 'add-value-modal',
      backdropDismiss: false,
      componentProps: { formGroup: this.formGroup }
    });
    await this.modalAddValue.present();
  }

  protected async openModalPaymentsController(): Promise<void> {
    this.modalPayments = await this.modalController.create({
      component: LoansModalPaymentsComponent,
      cssClass: 'loans-modal-edit',
      backdropDismiss: false,
      componentProps: { formGroup: this.formGroup }
    });
    await this.modalPayments.present();
  }

  protected patchValueItem(): void {
    this.formGroup.patchValue({
      [this.formCtrl.pendingValue]: this.getPendingValue + this.getValue,
      [this.formCtrl.fullValue]: this.getFullValue + this.getValue,
    });
  }

  protected patchValuePayments(): void {
    this.formGroup.patchValue({
      [this.formCtrl.pendingValue]: this.getPendingValue - this.getValue,
      [this.formCtrl.paidValue]: this.getPaidValue + this.getValue
    });
  }

  protected setHistory(type: string): void {
    this.formGroup.controls[this.formCtrl.history].value.push({
      date: this.todayDate,
      value: this.getValue,
      type
    });
  }

  protected resetFormCreate(): void {
    this.formGroup.controls[this.formCtrl.value].reset();
    this.formGroup.controls[this.formCtrl.name].reset();
    this.formGroup.controls[this.formCtrl.history].patchValue([]);
  }

  protected resetFormAddValue(): void {
    this.formGroup.controls[this.formCtrl.value].reset();
    this.formGroup.controls[this.formCtrl.history].patchValue([]);
  }

  protected resetFormPayments(): void {
    this.formGroup.controls[this.formCtrl.value].reset();
    this.formGroup.controls[this.formCtrl.history].patchValue([]);
    this.formGroup.controls[this.formCtrl.paymentMethod].reset();
  }

  private async openModalViewController(data: IcreditModel): Promise<void> {
    this.disableButton = true;
    const modalView = await this.modalController.create({
      component: LoansModalDetailsComponent,
      cssClass: 'view-modal',
      backdropDismiss: false,
      componentProps: { data }
    });
    await modalView.present();
    this.disableButton = await (await modalView.onWillDismiss()).data;
  }
}
