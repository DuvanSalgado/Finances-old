import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormCreditCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-loans-modal-create',
  templateUrl: './loans-modal-create.component.html',
  styleUrls: ['./loans-modal-create.component.scss'],
})
export class LoansModalCreateComponent {

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
