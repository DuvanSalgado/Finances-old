import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IcashGeneral, IExpensesModel, ITotal } from '../../shared/model/credit.interface';
import { FormExpensesCtrl } from '../../shared/model/formCredit.enum';
import { InicTotal } from '../../shared/model/initTotal';
import { mensages } from '../../shared/model/menssage';
import { CalculateService } from '../../shared/service/calculate.service';
import { ExpenseModel } from '../shared/model/expense.model';
import { ExpensesService } from '../shared/services/expenses.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html'
})
export class CashComponent extends ExpenseModel implements OnInit, OnDestroy {

  public formCtrl = FormExpensesCtrl;
  public formGroup: FormGroup = this.formExpense();
  public disableButton = false;
  public disableButtonMont = false;
  public loading = true;
  public cashGeneral: IcashGeneral = { value: 0 };
  public expenses: Array<IExpensesModel> = [];

  private total: ITotal = new InicTotal().total;
  private subscription: Subscription;
  private month = new Date().getMonth();


  constructor(
    protected formBuilder: FormBuilder,
    protected modalController: ModalController,
    private expensesService: ExpensesService,
    private loadingService: LoadingService,
    private calculateService: CalculateService
  ) {
    super(formBuilder, modalController);
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.getData(this.month);
    this.formExpenseCash();
  }

  public formExpenseCash(): void {
    this.formGroup
      .patchValue({ [this.formCtrl.icon]: { icon: 'cash-outline', labelColor: 'success' } });
  }

  public async openModalCreate(): Promise<void> {
    this.disableButton = true;
    await this.openModalController(this.formGroup);
    this.disableButton = await (await this.modal.onWillDismiss()).data;

    if (this.formGroup.valid) {
      this.saveExpensesCash();
    } else {
      this.resetForm(this.formGroup);
    }
  }

  private getData(month: number): void {
    this.subscription = this.expensesService.getAllForMont(month, 'expensesCash')
      .subscribe((data) => {
        this.loading = false;
        this.expenses = data;
      });

    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));

    this.subscription.add(this.calculateService.getAllCash()
      .subscribe((data) => this.cashGeneral = data[0]));
  }

  private async saveExpensesCash(): Promise<void> {
    await this.loadingService.presentLoading();

    await this.expensesService.create(this.formGroup.value, 'expensesCash');
    await this.calculateService.calculate(this.total, this.month);
    await this.calculateService.cashGeneral(this.cashGeneral);

    await this.loadingService.presentToast(mensages.successful);
    this.resetForm(this.formGroup);
    await this.loadingService.dismiss();
  }

}
