import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormCreditCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loans-modal-add-value',
  templateUrl: './loans-modal-add-value.component.html',
  styleUrls: ['./loans-modal-add-value.component.scss'],
})
export class LoansModalAddValueComponent {

  @Input() formGroup: FormGroup;
  public formCtrl = FormCreditCtrl;

  constructor(private modalController: ModalController) { }

  public async cancelModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  public async onSaveChange(evet: boolean): Promise<void> {
    await this.cancelModal();
  }

}
