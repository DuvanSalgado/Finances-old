import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ICombobox } from '@app/shared/combobox/model/combobox.interface';
import { ITEMSOPERATIONS, ITEMSPAYMENT, ITEMSTYPE } from '@app/shared/combobox/model/data.combobox';
import { IcashGeneral, IcreditModel, Iicons, ITotal } from '@credit/model/credit.interface';
import { FormCreditCtrl } from '@credit/model/formCredit.enum';
import { mensages } from '@credit/model/menssage';
import { Status, TypeCredit } from '@credit/model/status.enum';
import { CalculateService } from '@credit/service/calculate.service';
import { CreditService } from '@credit/service/credit.service';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modal-loans',
  templateUrl: './modal-loans.component.html',
  styleUrls: ['./modal-loans.component.scss'],
  providers: [LoadingService]
})
export class ModalLoansComponent implements OnInit, OnDestroy {

  @Input() data: IcreditModel = null;
  @Input() total: ITotal;
  @Input() title: string;
  @Input() isCreate = true;
  @Input() month;
  @Input() cashGeneral: IcashGeneral;

  public formGroup: FormGroup;
  public formCtrl = FormCreditCtrl;
  public itemsType: Array<ICombobox> = ITEMSTYPE;
  public itemsOperation: Array<ICombobox> = ITEMSOPERATIONS;
  public itemsPayment: Array<ICombobox> = [];

  private todayDate = new Date();
  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private formBuild: FormBuilder,
    private calculateService: CalculateService,
    private creditService: CreditService,
    private loadingService: LoadingService
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.initializeForm(this.data);
    this.changeValidationsForm();
  }

  public initializeForm(data: IcreditModel): void {
    this.formGroup = this.formBuild.group({
      [this.formCtrl.id]: [data?.id],
      [this.formCtrl.name]: [data?.name, Validators.required],
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.type]: [data?.type, Validators.required],
      [this.formCtrl.pendingValue]: [data ? data.pendingValue : 0],
      [this.formCtrl.paidValue]: [data ? data.paidValue : 0],
      [this.formCtrl.fullValue]: [data ? data.fullValue : 0],
      [this.formCtrl.month]: [data ? data.month : this.todayDate.getMonth()],
      [this.formCtrl.date]: [data ? data.date : format(this.todayDate, 'dd MM yyyy'), Validators.required],
      [this.formCtrl.operations]: [null],
      [this.formCtrl.payment]: [null],
      [this.formCtrl.icon]: [data?.icon],
      [this.formCtrl.history]: [data ? data.history : []]
    });
  }

  public async saveChange(event: boolean): Promise<void> {

    await this.loadingService.presentLoading();
    await this.calculate();
    this.setHistory();

    if (event) {
      await this.creditService.createCredit(this.formGroup.value);
      await this.loadingService.presentToast(mensages.successful);
    } else {
      await this.creditService.updateCredit(this.formGroup.value);
      await this.loadingService.presentToast(mensages.update);
    }

    await this.loadingService.dismiss();
    await this.modalController.dismiss();
  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  private changeValidationsForm(): void {
    if (!this.isCreate) {
      this.formGroup.controls[this.formCtrl.type].clearValidators();
      this.formGroup.controls[this.formCtrl.type].updateValueAndValidity();

      this.formGroup.controls[this.formCtrl.operations].addValidators(Validators.required);
      this.formGroup.controls[this.formCtrl.operations].updateValueAndValidity();
      this.formGroup.controls[this.formCtrl.payment].addValidators(Validators.required);
      this.formGroup.controls[this.formCtrl.payment].updateValueAndValidity();

      this.typeCombobox();
    }
  }

  private typeCombobox(): void {
    this.subscription = this.formGroup.controls[this.formCtrl.operations]
      .valueChanges.subscribe(data => {

        this.formGroup.controls[this.formCtrl.payment].reset();
        if (data.id === TypeCredit.prestamo) {
          this.itemsPayment = ITEMSTYPE;
          this.formGroup.controls[this.formCtrl.payment].patchValue(this.data.type);
          this.formGroup.controls[this.formCtrl.payment].disable();
        } else {
          this.formGroup.controls[this.formCtrl.payment].enable();
          this.itemsPayment = ITEMSPAYMENT;
        }
      });
  }

  private async calculate(): Promise<void> {
    const pendingValue = parseInt(this.formGroup.get(this.formCtrl.pendingValue).value, 10);
    const value = parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
    const paid = parseInt(this.formGroup.get(this.formCtrl.paidValue).value, 10);
    const type = this.formGroup.get(this.formCtrl.type)?.value?.id;
    const operations = this.formGroup.get(this.formCtrl.operations)?.value?.id;
    let icon: Iicons;

    if (this.isCreate || operations === TypeCredit.prestamo) {

      if (this.data?.type?.id === Status.credito || type === Status.credito) {
        this.total.loanCredit = this.total.loanCredit + value;
        this.total.pendingCredit = this.total.pendingCredit + value;
        icon = { icon: 'card-outline', labelColor: 'warning' };
      }

      if (this.data?.type?.id === Status.debito || type === Status.debito) {
        this.total.loanDebit = this.total.loanDebit + value;
        this.total.pendingDebit = this.total.pendingDebit + value;
        icon = { icon: 'reader-outline', labelColor: 'primary' };
      }

      if (this.data?.type?.id === Status.efectivo || type === Status.efectivo) {
        this.cashGeneral.value = this.cashGeneral.value - value;
        icon = { icon: 'cash-outline', labelColor: 'success' };
      }

      this.formGroup.patchValue({
        [this.formCtrl.pendingValue]: pendingValue + value,
        [this.formCtrl.fullValue]: pendingValue + paid + value,
        [this.formCtrl.icon]: icon
      });
    }

    if (!this.isCreate && operations === TypeCredit.abono) {

      if (this.formGroup.get(this.formCtrl.payment).value.id === Status.efectivo) {
        this.cashGeneral.value = this.cashGeneral.value + value;
      }

      if (this.data.type.id === Status.credito) {
        this.total.totalCredit = this.total.totalCredit + value;
        this.total.pendingCredit = this.total.pendingCredit - value;
      }

      if (this.data.type.id === Status.debito) {
        this.total.totalDebit = this.total.totalDebit + value;
        this.total.pendingDebit = this.total.pendingDebit - value;
      }

      this.formGroup.patchValue({
        [this.formCtrl.paidValue]: value + paid,
        [this.formCtrl.pendingValue]: pendingValue - value
      });
    }
    await this.calculateService.calculate(this.total, this.month);
    await this.calculateService.cashGeneral(this.cashGeneral);
  }

  private setHistory(): void {
    this.formGroup.controls[this.formCtrl.history].value.push({
      date: this.formGroup.get(this.formCtrl.date).value,
      value: this.formGroup.get(this.formCtrl.value).value,
      operation: this.formGroup.get(this.formCtrl.operations).value,
    });
  }

}
