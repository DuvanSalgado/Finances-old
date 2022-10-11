import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { AlertController, ModalController } from '@ionic/angular';
import { mensages } from '../../shared/model/menssage';
import { CalculateService } from '../../shared/service/calculate.service';
import { ExpenseModel } from '../shared/model/expense.model';
import { IExpensesModel } from '../shared/model/interfaces/expenses';
import { ExpensesService } from '../shared/services/expenses.service';

@Component({
  selector: 'app-expenses-debit',
  templateUrl: './expenses-debit.component.html',
  styleUrls: ['../expenses.component.scss'],
})
export class ExpensesDebitComponent extends ExpenseModel implements OnInit, OnDestroy {

  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController,
    private expensesService: ExpensesService,
    private loadingService: LoadingService,
    private calculateService: CalculateService,
    private alertController: AlertController
  ) {
    super(formBuilder, modalController);
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.getData(this.month);
    this.formExpenseDebit();
  }

  public async openModalCreate(): Promise<void> {
    this.disableButton = true;
    await this.openModalController();
    this.disableButton = await (await this.modal.onWillDismiss()).data;

    if (this.formGroup.valid) { this.saveExpensesCash(); }
    else { this.resetForm(); }
  }

  public valueChanges(month: number): void {
    this.monthSelect = this.month !== month;
    this.loading = true;
    this.expenses = [];
    this.getData(month);
  }

  public async deleteItem(item: IExpensesModel): Promise<void> {
    const alert = await this.alertController.create({
      header: '¿Esta seguro?',
      cssClass: 'custom-alert',
      backdropDismiss: false,
      buttons: [{ text: 'No', role: 'cancel' },
      {
        text: 'Si', role: 'confirm',
        handler: () => {
          this.deleteItemService(item);
        },
      },
      ],
    });
    await alert.present();
  }

  private async deleteItemService(item: IExpensesModel): Promise<void> {
    this.operationsDelete(item.value);
    try {
      await this.expensesService.deleteItem(item.id, 'expensesDebit');
      await this.calculateService.calculate(this.total);
    } catch (error) {
      this.loadingService.presentToast(error);
    }
  }

  private formExpenseDebit(): void {
    this.formGroup
      .patchValue({ [this.formCtrl.icon]: { icon: 'reader-outline', labelColor: 'primary' } });
  }

  private getData(month: number): void {
    this.subscription = this.expensesService.getAllForMont(month, 'expensesDebit')
      .subscribe((data) => {
        this.expenses = data;

        this.subscription.add(this.calculateService.getAll(month)
          .subscribe((total) => { if (total.length > 0) { this.total = total[0]; } this.loading = false; }
          ));
      }, (error) => this.loadingService.presentToast(error));
  }

  private async saveExpensesCash(): Promise<void> {
    this.operationsCreate();
    this.loadingService.presentLoading();

    try {
      await this.calculateService.calculate(this.total, this.month);
      await this.expensesService.create(this.formGroup.value, 'expensesDebit');
      this.loadingService.presentToast(mensages.successful);
    } catch (error) {
      this.loadingService.presentToast(error);
    }

    this.resetForm();
    this.loadingService.dismiss();
  }

  private operationsCreate(): void {
    this.total.expenseDebit = this.total.expenseDebit + this.getValue;
    this.total.totalDebit = this.total.totalDebit + this.getValue;
  }

  private operationsDelete(value: number): void {
    this.total.expenseDebit = this.total.expenseDebit - value;
    this.total.totalDebit = this.total.totalDebit - value;
  }

}
