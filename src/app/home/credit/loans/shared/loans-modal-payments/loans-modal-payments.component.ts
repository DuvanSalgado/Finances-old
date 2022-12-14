import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormCreditCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { ICombobox } from '@app/shared/combobox/model/combobox.interface';
import { ITEMSPAYMENT } from '@app/shared/combobox/model/data.combobox';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loans-modal-payments',
  templateUrl: './loans-modal-payments.component.html',
  styleUrls: ['./loans-modal-payments.component.scss'],
})
export class LoansModalPaymentsComponent {

  @Input() formGroup: FormGroup;
  public itemsPayment: Array<ICombobox> = ITEMSPAYMENT;
  public formCtrl = FormCreditCtrl;

  constructor(private modalController: ModalController) { }

  public async cancelModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  public async onSaveChange(evet: boolean): Promise<void> {
    await this.modalController.dismiss(true);
  }
}
