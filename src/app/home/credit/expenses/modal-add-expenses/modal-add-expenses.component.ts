import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITEMSEXPENSE } from '@app/shared/combobox/model/data.combobox';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { ITotal } from '@credit/model/credit.interface';
import { FormExpensesCtrl } from '@credit/model/formCredit.enum';
import { mensages } from '@credit/model/menssage';
import { Status } from '@credit/model/status.enum';
import { CalculateService } from '@credit/service/calculate.service';
import { ExpensesService } from '@credit/service/expenses.service';

@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './modal-add-expenses.component.html',
})
export class ModalAddExpensesComponent implements OnInit {

  @Input() total: ITotal;

  public loading = false;
  public formGroup: FormGroup;
  public formCtrl = FormExpensesCtrl;
  public itemsType = ITEMSEXPENSE;

  private loadingModal: any;
  private todayDate = new Date();

  constructor(
    private modalController: ModalController,
    private formbuilder: FormBuilder,
    private calculateService: CalculateService,
    private expensesService: ExpensesService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  cancel(): void {
    this.modalController.dismiss(false);
  }

  public async onSaveChange(evet: boolean): Promise<void> {
    this.loading = true;
    await this.presentLoading();
    await this.calculate();
    await this.expensesService.create(this.formGroup.value);
    await this.presentToast(mensages.successful);
    this.loading = false;
    await this.loadingModal.dismiss();
    await this.modalController.dismiss();
  }

  private initializeForm(): void {
    this.formGroup = this.formbuilder.group({
      [this.formCtrl.value]: [null, Validators.required],
      [this.formCtrl.description]: [null, Validators.required],
      [this.formCtrl.status]: [null, Validators.required],
      [this.formCtrl.date]: [format(this.todayDate, 'MMM dd yyyy')],
      [this.formCtrl.month]: [this.todayDate.getMonth()]
    });
  }

  private async calculate(): Promise<void> {
    const value = parseInt(this.formGroup.get(this.formCtrl.value).value, 10);

    if (this.formGroup.get(this.formCtrl.status).value.id === Status.efectivo) {
      this.total.cash = this.total.cash - value;
      this.total.expenseCash = this.total.expenseCash + value;

    } else if (this.formGroup.get(this.formCtrl.status).value.id === Status.credito) {
      this.total.expenseCredit = this.total.expenseCredit + value;
      this.total.loanCredit = this.total.loanCredit + value;

    } else {
      this.total.expenseDebit = this.total.expenseDebit + value;
    }

    await this.calculateService.calculate(this.total);
  }

  private async presentToast(mensaje: string): Promise<void> {
    const toast = await this.toastController
      .create({ message: mensaje, duration: 900 });
    toast.present();
  }

  private async presentLoading(): Promise<void> {
    this.loadingModal = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loadingModal.present();
  }
}
