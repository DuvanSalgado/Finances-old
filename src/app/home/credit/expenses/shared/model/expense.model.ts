import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormExpensesCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { ModalController } from '@ionic/angular';
import { ModalAddExpensesComponent } from '../modal-add-expenses/modal-add-expenses.component';

export class ExpenseModel {

  protected formCtrl = FormExpensesCtrl;
  protected modal: HTMLIonModalElement;
  protected formGroupModel: FormGroup;
  private todayDate = new Date();

  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController
  ) { }

  protected formExpense(): FormGroup {
    return this.formBuilder.group({
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.description]: [null, Validators.required],
      [this.formCtrl.date]: [this.todayDate],
      [this.formCtrl.month]: [this.todayDate.getMonth()],
      [this.formCtrl.icon]: [null]
    });
  }

  protected async openModalController(): Promise<void> {
    this.modal = await this.modalController.create({
      component: ModalAddExpensesComponent,
      cssClass: 'expenses-modal',
      backdropDismiss: false,
      componentProps: { formGroup: this.formGroupModel }
    });
    await this.modal.present();
  }

  protected resetForm(): void {
    this.formGroupModel.controls[this.formCtrl.value].reset();
    this.formGroupModel.controls[this.formCtrl.description].reset();
  }

  protected getValue(): number {
    return parseInt(this.formGroupModel.get(this.formCtrl.value).value, 10);
  }

}
