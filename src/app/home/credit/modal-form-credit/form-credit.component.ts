import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { IcreditModel } from '../model/credit.interface';
import { FormCreditCtrl } from '../model/formCredit.enum';
import { CreditService } from '../service/credit.service';
@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class ModalFormCreditComponent implements OnInit {

  @Input() data: IcreditModel = null;
  @Input() isCreate = true;

  public formGroup: FormGroup;
  public formCtrl = FormCreditCtrl;
  public loading = false;
  public loadingModal: any;

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
      [this.formCtrl.name]: [data ? data.name : null, Validators.required],
      [this.formCtrl.value]: [data ? data.value : null, Validators.required],
      [this.formCtrl.month]: [data ? data.month : new Date().getMonth()],
      [this.formCtrl.date]: [data ? data.date : format(new Date(), 'MMM dd yyyy')],
      [this.formCtrl.status]: [data ? data.status : { name: 'Selecione', id: 0 }],
    });
  }

  public cancel(): void {
    this.modalController.dismiss();
  }

  public async saveChange(event: boolean): Promise<void> {
    this.loading = true;
    await this.presentLoading();
    if (event) {
      await this.creditService.createCredit(this.formGroup.value);
      await this.presentToast('Registro creado correctamente');
    } else {
      console.log(99);

    }
    this.loading = false;
    await this.loadingModal.dismiss();
    await this.modalController.dismiss();
  }

  private async presentToast(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  private async presentLoading(): Promise<void> {
    this.loadingModal = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loadingModal.present();
  }
}
