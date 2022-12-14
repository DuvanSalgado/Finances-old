import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IcashGeneral, IcreditModel, ITotal } from '@app/home/credit/shared/model/credit.interface';
import { FormCreditCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { Status } from '@app/home/credit/shared/model/status.enum';
import { ICombobox } from '@app/shared/combobox/model/combobox.interface';

export abstract class LoansFormModel {

  public formCtrl = FormCreditCtrl;
  private formGroup: FormGroup;
  protected todayDate = new Date();

  constructor(
    protected formBuilder: FormBuilder,
  ) { }

  protected get getValue(): number {
    return parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
  }

  protected get getReason(): string {
    return this.formGroup.get(this.formCtrl.reason)?.value;
  }

  protected get getPaymentMethod(): ICombobox {
    return this.formGroup.get(this.formCtrl.paymentMethod)?.value;
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

  public get getValueIcon(): any {
    return this.getFormGroup.get(this.formCtrl.icon).value;
  }

  public get getFormGroup(): FormGroup {
    return this.formGroup;
  }

  public abstract patchFormLoans(): void;

  public abstract operations(total: ITotal, cashGeneral?: IcashGeneral): void;


  public initializeFormLoansCreate(): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.name]: [null, Validators.required],
      [this.formCtrl.reason]: [null, Validators.required],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.pendingValue]: [0],
      [this.formCtrl.paidValue]: [0],
      [this.formCtrl.fullValue]: [0],
      [this.formCtrl.type]: [null, Validators.required],
      [this.formCtrl.month]: [this.todayDate.getMonth()],
      [this.formCtrl.year]: [this.todayDate.getFullYear()],
      [this.formCtrl.date]: [this.todayDate],
      [this.formCtrl.paymentMethod]: [null],
      [this.formCtrl.icon]: [null],
      [this.formCtrl.historyLoan]: [[]],
      [this.formCtrl.historyPayment]: [[]]
    });
  }

  public formLoansAddValue(data: IcreditModel): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.id]: [data.id],
      [this.formCtrl.name]: [data.name],
      [this.formCtrl.reason]: [null, Validators.required],
      [this.formCtrl.icon]: [data.icon],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.pendingValue]: [data.pendingValue],
      [this.formCtrl.fullValue]: [data.fullValue],
      [this.formCtrl.type]: [data.type],
      [this.formCtrl.historyLoan]: [data.historyLoan]
    });
  }

  public formLoansPayments(data: IcreditModel): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.id]: [data.id],
      [this.formCtrl.name]: [data.name],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0), Validators.max(data.pendingValue)]],
      [this.formCtrl.pendingValue]: [data.pendingValue],
      [this.formCtrl.paidValue]: [data.paidValue],
      [this.formCtrl.type]: [data.type],
      [this.formCtrl.paymentMethod]: [null, Validators.required],
      [this.formCtrl.historyPayment]: [data.historyPayment]
    });
  }

  public patchValueItem(): void {
    this.formGroup.patchValue({
      [this.formCtrl.pendingValue]: this.getPendingValue + this.getValue,
      [this.formCtrl.fullValue]: this.getFullValue + this.getValue,
    });
  }

  public patchValuePayments(): void {
    this.formGroup.patchValue({
      [this.formCtrl.pendingValue]: this.getPendingValue - this.getValue,
      [this.formCtrl.paidValue]: this.getPaidValue + this.getValue
    });
  }

  public setHistoryPayment(): void {
    this.formGroup.controls[this.formCtrl.historyPayment].value.push({
      date: this.todayDate,
      value: this.getValue,
      paymentMethod: this.getPaymentMethod
    });
  }

  public setHistoryLoan(icon): void {
    this.formGroup.controls[this.formCtrl.historyLoan].value.push({
      date: this.todayDate,
      value: this.getValue,
      reason: this.getReason,
      icon
    });
  }

}
