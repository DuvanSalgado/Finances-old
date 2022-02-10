import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IcreditModel } from '../model/credit.interface';
import { FormCreditCtrl } from '../model/formCredit.enum';
@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class FormCreditComponent implements OnInit {

  @Input() data: IcreditModel = null;
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
      [this.formCtrl.name]: [data ? data.name : null],
      [this.formCtrl.value]: [data ? data.value : null],
      [this.formCtrl.date]: [data ? data.date : null],
      [this.formCtrl.spending]: [data ? data.spending : false],
      [this.formCtrl.cash]: [data ? data.cash : false],
      [this.formCtrl.outstanding]: [data ? data.outstanding : false]
    });
  }

  cancel(): void {
    this.modalController.dismiss();
  }

}
