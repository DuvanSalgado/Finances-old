import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormExpensesCtrl } from '@credit/model/formCredit.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './expenses-modal-add.component.html',
  styleUrls: ['./expenses-modal-add.component.scss']
})
export class ExpensesModalAddComponent {

  @Input() formGroup: FormGroup;
  public formCtrl = FormExpensesCtrl;

  constructor(
    private modalController: ModalController,
  ) { }

  public async cancelModal(): Promise<void> {
    await this.modalController.dismiss(false);
  }

  public async onSaveChange(evet: boolean): Promise<void> {
    await this.cancelModal();
  }

}
