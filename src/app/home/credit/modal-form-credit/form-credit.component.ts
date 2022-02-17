import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { IcreditModel } from '../shared/model/credit.interface';
import { FormCreditCtrl } from '../shared/model/formCredit.enum';
import { CreditService } from '../shared/service/credit.service';
@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class ModalFormCreditComponent implements OnInit {

  @Input() data: IcreditModel = null;
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
      [this.formCtrl.id]: [data ? data.id : null],
      [this.formCtrl.name]: [data ? data.name : null, Validators.required],
      [this.formCtrl.value]: [data ? data.value : null, Validators.required],
      [this.formCtrl.valueInitial]: [data ? data.valueInitial : null],
      [this.formCtrl.month]: [data ? data.month : this.todayDate.getMonth()],
      [this.formCtrl.date]: [data ? data.date : format(this.todayDate, 'MMM dd yyyy'), Validators.required],
      [this.formCtrl.status]: [data ? data.status : null, Validators.required],
      [this.formCtrl.history]: [data ? data.history : []]
    });
  }

  public async saveChange(event: boolean): Promise<void> {
    this.setValueInitial();
    this.setHistory();
    this.loading = true;
    await this.presentLoading();
    if (event) {
      await this.creditService.createCredit(this.formGroup.value);
      await this.presentToast('Registro creado correctamente');
    } else {
      await this.creditService.updateCredit(this.formGroup.value);
      await this.presentToast('Registro actualizado correctamente');
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

  private setValueInitial(): void {
    if (!this.formGroup.get(this.formCtrl.valueInitial).value) {
      this.formGroup.controls[this.formCtrl.valueInitial]
        .setValue(this.formGroup.get(this.formCtrl.value).value);
    }
  }

  private setHistory(): void {
    this.formGroup.controls[this.formCtrl.history].value.push({
      date: this.formGroup.controls[this.formCtrl.date].value,
      value: this.formGroup.controls[this.formCtrl.value].value,
      status: this.formGroup.controls[this.formCtrl.status].value
    });
  }

  private async presentLoading(): Promise<void> {
    this.loadingModal = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loadingModal.present();
  }
}
