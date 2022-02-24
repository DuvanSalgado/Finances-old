import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { IcreditModel } from '../shared/model/credit.interface';
import { FormCreditCtrl } from '../shared/model/formCredit.enum';
import { mensages } from '../shared/model/menssage';
import { Status } from '../shared/model/status.enum';
import { CreditService } from '../shared/service/credit.service';
@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class ModalFormCreditComponent implements OnInit {

  @Input() data: IcreditModel = null;
  @Input() title: string;
  @Input() isCreate = true;
  @Input() isView = false;

  public formGroup: FormGroup;
  public formCtrl = FormCreditCtrl;
  public loading = false;
  public loadingModal: any;

  private todayDate = new Date();

  constructor(
    private modalController: ModalController,
    private formBuild: FormBuilder,
    private creditService: CreditService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    this.initializeForm(this.data);
  }

  public initializeForm(data: IcreditModel): void {
    this.formGroup = this.formBuild.group({
      [this.formCtrl.id]: [data?.id],
      [this.formCtrl.name]: [data?.name, Validators.required],
      [this.formCtrl.value]: [null, Validators.required],
      [this.formCtrl.pendingValue]: [data ? data.pendingValue : 0],
      [this.formCtrl.paidValue]: [data ? data.paidValue : 0],
      [this.formCtrl.fullValue]: [data ? data.fullValue : 0],
      [this.formCtrl.month]: [data ? data.month : this.todayDate.getMonth()],
      [this.formCtrl.date]: [data ? data.date : format(this.todayDate, 'MMM dd yyyy'), Validators.required],
      [this.formCtrl.status]: [data?.status, Validators.required],
      [this.formCtrl.history]: [data ? data.history : []]
    });
  }

  public async saveChange(event: boolean): Promise<void> {

    this.calculate();
    this.setHistory();

    this.loading = true;
    await this.presentLoading();
    if (event) {
      await this.creditService.createCredit(this.formGroup.value);
      await this.presentToast(mensages.successful);
    } else {
      await this.creditService.updateCredit(this.formGroup.value);
      await this.presentToast(mensages.update);
    }

    this.loading = false;
    await this.loadingModal.dismiss();
    await this.modalController.dismiss();

  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  private async presentToast(mensaje: string): Promise<void> {
    const toast = await this.toastController
      .create({ message: mensaje, duration: 900 });
    toast.present();
  }

  private calculate(): void {

    const pendingValue = parseInt(this.formGroup.get(this.formCtrl.pendingValue).value, 10);
    const value = parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
    const paid = parseInt(this.formGroup.get(this.formCtrl.paidValue).value, 10);

    if (this.formGroup.get(this.formCtrl.status).value.id === Status.prestamo) {
      this.formGroup.patchValue({
        [this.formCtrl.pendingValue]: pendingValue + value,
        [this.formCtrl.fullValue]: pendingValue + paid + value
      });
    }

    if (this.formGroup.get(this.formCtrl.status).value.id === Status.efectivo) {
      this.formGroup.patchValue({
        [this.formCtrl.paidValue]: value + paid,
        [this.formCtrl.pendingValue]: pendingValue - value
      });
    }
  }

  private setHistory(): void {
    this.formGroup.controls[this.formCtrl.history].value.push({
      date: this.formGroup.get(this.formCtrl.date).value,
      value: this.formGroup.get(this.formCtrl.value).value,
      status: this.formGroup.get(this.formCtrl.status).value
    });
  }

  private async presentLoading(): Promise<void> {
    this.loadingModal = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loadingModal.present();
  }
}
