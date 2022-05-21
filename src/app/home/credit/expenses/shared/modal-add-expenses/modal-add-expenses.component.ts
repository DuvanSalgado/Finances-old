import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormExpensesCtrl } from '@credit/model/formCredit.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './modal-add-expenses.component.html',
  styleUrls: ['./modal-add-expenses.component.scss']
})
export class ModalAddExpensesComponent {

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

  /*   private async calculate(): Promise<void> {



      if (type === Status.debito) {
        this.total.expenseDebit = this.total.expenseDebit + value;
        this.total.loanDebit = this.total.loanDebit + value;
        icon = { icon: 'reader-outline', labelColor: 'primary' };
      }

    } */

}
