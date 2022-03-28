import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { ITotal } from '../../shared/model/credit.interface';
import { FormExpensesCtrl } from '../../shared/model/formCredit.enum';
import { mensages } from '../../shared/model/menssage';
import { CalculateService } from '../../shared/service/calculate.service';
import { ExpensesService } from '../../shared/service/expenses.service';
@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './modal-add-expenses.component.html',
  styleUrls: ['./modal-add-expenses.component.scss'],
})
export class ModalAddExpensesComponent implements OnInit {

  @Input() total: ITotal;

  public loading = false;
  public formGroup: FormGroup;
  public formCtrl = FormExpensesCtrl;

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

  ngOnInit() {
    this.initializeForm();
  }

  cancel(): void {
    this.modalController.dismiss();
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
      [this.formCtrl.value]: [null, [Validators.required]],
      [this.formCtrl.description]: [null, [Validators.required]],
      [this.formCtrl.cash]: [false],
      [this.formCtrl.date]: [format(this.todayDate, 'MMM dd yyyy')],
      [this.formCtrl.month]: [this.todayDate.getMonth()]
    });
  }

  private async calculate(): Promise<void> {
    const value = parseInt(this.formGroup.get(this.formCtrl.value).value, 10);

    if (this.formGroup.get(this.formCtrl.cash).value) {
      this.total[0].cash = this.total.cash - value;
    }

    const valueTotal = (this.total.expenseCredit === 0) ? 0 : this.total.expenseCredit;
    const reques: ITotal = {
      ...this.total,
      expenseCredit: value + valueTotal,
    };
    await this.calculateService.calculate(reques);
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
