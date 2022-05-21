import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { mensages } from '../../shared/model/menssage';
import { CalculateService } from '../../shared/service/calculate.service';
import { ExpenseModel } from '../shared/model/expense.model';
import { ExpensesService } from '../shared/services/expenses.service';

@Component({
  selector: 'app-expenses-credit',
  templateUrl: './expenses-credit.component.html',
  styleUrls: ['../expenses.component.scss'],
})
export class ExpensesCreditComponent extends ExpenseModel implements OnInit {

  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController,
    private expensesService: ExpensesService,
    private loadingService: LoadingService,
    private calculateService: CalculateService
  ) {
    super(formBuilder, modalController);
  }

  ngOnInit(): void {
    this.getData(this.month);
    this.formExpenseCash();
  }

  public formExpenseCash(): void {
    this.formGroup
      .patchValue({ [this.formCtrl.icon]: { icon: 'card-outline', labelColor: 'warning' } });
  }


  public async openModalCreate(): Promise<void> {
    this.disableButton = true;
    await this.openModalController();
    this.disableButton = await (await this.modal.onWillDismiss()).data;

    if (this.formGroup.valid) {
      this.saveExpensesCash();
    } else {
      this.resetForm();
    }
  }

  private getData(month: number): void {
    this.subscription = this.expensesService.getAllForMont(month, 'expensesCredit')
      .subscribe((data) => {
        this.loading = false;
        this.expenses = data;
      });

    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));

  }

  private async saveExpensesCash() {
    this.operations();
    await this.loadingService.presentLoading();

    await this.calculateService.calculate(this.total, this.month);
    await this.expensesService.create(this.formGroup.value, 'expensesCredit');

    await this.loadingService.presentToast(mensages.successful);
    this.resetForm();
    await this.loadingService.dismiss();
  }

  private operations(): void {
    this.total.expenseCredit = this.total.expenseCredit + this.getValue();
    this.total.loanCredit = this.total.loanCredit + this.getValue();
  }

}
