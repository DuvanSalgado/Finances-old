import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IcashGeneral, ITotal } from '@app/home/credit/shared/model/credit.interface';
import { FormExpensesCtrl } from '@app/home/credit/shared/model/formCredit.enum';
import { InicTotal } from '@app/home/credit/shared/model/initTotal';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ExpensesModalAddComponent } from '../expenses-modal-add/expenses-modal-add.component';
import { IExpensesModel } from './interfaces/expenses';

export class ExpenseModel {

  public loading = true;
  public disableButton = false;
  public cashGeneral: IcashGeneral = { id: null, value: 0 };
  public expenses: Array<IExpensesModel> = [];
  public formCtrl = FormExpensesCtrl;
  public formGroup: FormGroup;
  public monthSelect: boolean;

  protected modal: HTMLIonModalElement;
  protected month = new Date().getMonth();
  protected year = new Date().getFullYear();
  protected total: ITotal = new InicTotal().total;
  protected subscription: Subscription;

  private todayDate = new Date();

  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController
  ) {
    this.formGroup = this.formExpense();
  }

  protected get getValue(): number {
    return parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
  }

  protected formExpense(): FormGroup {
    return this.formBuilder.group({
      [this.formCtrl.value]: [null, [Validators.required, Validators.min(0)]],
      [this.formCtrl.description]: [null, Validators.required],
      [this.formCtrl.date]: [this.todayDate],
      [this.formCtrl.month]: [this.todayDate.getMonth()],
      [this.formCtrl.year]:[this.todayDate.getFullYear()],
      [this.formCtrl.icon]: [null]
    });
  }

  protected async openModalController(): Promise<void> {
    this.modal = await this.modalController.create({
      component: ExpensesModalAddComponent,
      cssClass: 'expenses-modal',
      backdropDismiss: false,
      componentProps: { formGroup: this.formGroup }
    });
    await this.modal.present();
  }

  protected resetForm(): void {
    this.formGroup.controls[this.formCtrl.value].reset();
    this.formGroup.controls[this.formCtrl.description].reset();
  }

}
