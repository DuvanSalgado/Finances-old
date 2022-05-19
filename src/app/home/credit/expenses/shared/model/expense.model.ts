import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { FormExpensesCtrl } from '../../shared/model/formCredit.enum';
import { ModalAddExpensesComponent } from '../modal-add-expenses/modal-add-expenses.component';

export class ExpenseModel {

  protected formCtrl = FormExpensesCtrl;
  protected modal: HTMLIonModalElement;
  private todayDate = new Date();

  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController
  ) { }

  protected formExpense(): FormGroup {
    return this.formBuilder.group({
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.description]: [null, Validators.required],
      [this.formCtrl.date]: [format(this.todayDate, 'dd MM yyyy')],
      [this.formCtrl.month]: [this.todayDate.getMonth()],
      [this.formCtrl.icon]: [null]
    });
  }

  protected async openModalController(formGroup: FormGroup): Promise<void> {
    this.modal = await this.modalController.create({
      component: ModalAddExpensesComponent,
      cssClass: 'expenses-modal',
      backdropDismiss: false,
      componentProps: { formGroup }
    });
    await this.modal.present();
  }

  protected resetForm(formGroup: FormGroup): void {
    formGroup.controls[this.formCtrl.value].reset();
    formGroup.controls[this.formCtrl.description].reset();
  }

}
