import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IcreditModel } from '../model/credit.interface';
import { FormCreditCtrl } from '../model/formCredit.enum';
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
  constructor(
    private modalController: ModalController,
    private formBuild: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm(this.data);
  }

  initializeForm(data: IcreditModel): void {
    this.formGroup = this.formBuild.group({
      [this.formCtrl.name]: [data ? data.name : null, Validators.required],
      [this.formCtrl.value]: [data ? data.value : null, Validators.required],
      [this.formCtrl.date]: [data ? data.date : null, Validators.required],
      [this.formCtrl.spending]: [data ? data.spending : false],
      [this.formCtrl.cash]: [data ? data.cash : false],
      [this.formCtrl.outstanding]: [data ? data.outstanding : false]
    });
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  saveChange(): void {
    console.log(this.formGroup.value);

  }

}
