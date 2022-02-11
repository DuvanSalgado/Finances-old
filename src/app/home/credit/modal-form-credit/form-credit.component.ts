import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
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
  formGroup: FormGroup;
  formCtrl = FormCreditCtrl;
  loading = false;;

  constructor(
    private modalController: ModalController,
    private formBuild: FormBuilder,
    private creditService: CreditService,
    public toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.initializeForm(this.data);
  }

  initializeForm(data: IcreditModel): void {
    this.formGroup = this.formBuild.group({
      [this.formCtrl.name]: [data ? data.name : null, Validators.required],
      [this.formCtrl.value]: [data ? data.value : null, Validators.required],
      [this.formCtrl.month]: [data ? data.month : null, Validators.required],
      [this.formCtrl.spending]: [data ? data.spending : false, Validators.required],
      [this.formCtrl.cash]: [data ? data.cash : false, Validators.required],
      [this.formCtrl.outstanding]: [data ? data.outstanding : false, Validators.required]
    });
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  async saveChange(): Promise<void> {
    this.loading = true;
    await this.creditService.createCredit(this.formGroup.value);
    await this.presentToast('Registro creado correctamente');
    this.loading = false;
    await this.modalController.dismiss();
  }

  private async presentToast(mensaje: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
