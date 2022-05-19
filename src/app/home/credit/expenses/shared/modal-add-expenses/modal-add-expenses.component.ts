import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormExpensesCtrl } from '@credit/model/formCredit.enum';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './modal-add-expenses.component.html'
})
export class ModalAddExpensesComponent  {

  @Input() formGroup: FormGroup;

  public loading = false;
  public formCtrl = FormExpensesCtrl;

  constructor(
    private modalController: ModalController,
    //  private formbuilder: FormBuilder,
    /* private calculateService: CalculateService,
    private expensesService: ExpensesService,  */
  ) { }

  public async cancelModal(): Promise<void> {
    await this.modalController.dismiss(false);
  }

  public async onSaveChange(evet: boolean): Promise<void> {
    await this.cancelModal();
  }

  /*   private async calculate(): Promise<void> {
      const value = parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
      const type = this.formGroup.get(this.formCtrl.type).value.id;
      let icon: Iicons;

      if (type === Status.efectivo) {
        this.cashGeneral.value = this.cashGeneral.value - value;
        this.total.expenseCash = this.total.expenseCash + value;
        icon = { icon: 'cash-outline', labelColor: 'success' };
      }

      if (type === Status.credito) {
        this.total.expenseCredit = this.total.expenseCredit + value;
        this.total.loanCredit = this.total.loanCredit + value;
        icon = { icon: 'card-outline', labelColor: 'warning' };
      }

      if (type === Status.debito) {
        this.total.expenseDebit = this.total.expenseDebit + value;
        this.total.loanDebit = this.total.loanDebit + value;
        icon = { icon: 'reader-outline', labelColor: 'primary' };
      }

      this.formGroup.patchValue({ [this.formCtrl.icon]: icon });
      await this.calculateService.calculate(this.total, this.month);
      await this.calculateService.cashGeneral(this.cashGeneral);
    } */

}
