import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormCreditCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { ICombobox } from '@app/shared/combobox/model/combobox.interface';
import { ITEMSTYPE } from '@app/shared/combobox/model/data.combobox';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loans-modal-create',
  templateUrl: './loans-modal-create.component.html',
  styleUrls: ['./loans-modal-create.component.scss'],
})
export class LoansModalCreateComponent {

  @Input() formGroup: FormGroup;
  public formCtrl = FormCreditCtrl;
  public itemsType: Array<ICombobox> = ITEMSTYPE;

  constructor(private modalController: ModalController) { }

  public async cancelModal(): Promise<void> {
    await this.modalController.dismiss();
  }

  public async onSaveChange(): Promise<void> {
    await this.modalController.dismiss(true);
  }
}
