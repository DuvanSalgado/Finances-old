import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IExpensesModel, ITotal } from '../shared/model/credit.interface';
import { CalculateService } from '../shared/service/calculate.service';
import { ExpensesService } from '../shared/service/expenses.service';
import { ModalAddExpensesComponent } from './modal-add-expenses/modal-add-expenses.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, OnDestroy {

  public loading = true;
  public expenses: Array<IExpensesModel> = [];
  private total: ITotal = {
    expenseCredit: 0,
    loanCredit: 0,
    cash: 0,
    paidCredit: 0,
    pendingCredit: 0,
    expenseDebit: 0,
    paidDebit: 0,
    pendingDebit: 0,
    loanDebit: 0,
    expenseCash: 0,
  };

  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private expensesService: ExpensesService,
    private calculateService: CalculateService,
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.subscription = this.expensesService.getAll()
      .subscribe((data) => { this.loading = false; this.expenses = data; });

    this.subscription.add(this.calculateService.getAll()
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));
  }

  public async openModalCreate(): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalAddExpensesComponent,
      cssClass: 'expenses-modal',
      backdropDismiss: false,
      componentProps: { total: this.total }
    });
    return await modal.present();
  }
}

