import { Component, OnDestroy, OnInit } from '@angular/core';
import { IExpensesModel, ITotal } from '@credit/model/credit.interface';
import { CalculateService } from '@credit/service/calculate.service';
import { ExpensesService } from '@credit/service/expenses.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { InicTotal } from '../shared/model/initTotal';
import { ModalAddExpensesComponent } from './modal-add-expenses/modal-add-expenses.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, OnDestroy {

  public loading = true;
  public disableButton = false;
  public expenses: Array<IExpensesModel> = [];
  public currentMonth = new Date().getMonth();
  private total: ITotal = new InicTotal().total;

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
    this.getData(this.currentMonth);
  }

  public async openModalCreate(): Promise<void> {
    this.disableButton = true;
    const modal = await this.modalController.create({
      component: ModalAddExpensesComponent,
      cssClass: 'expenses-modal',
      backdropDismiss: false,
      componentProps: { total: this.total }
    });
    await modal.present();
    this.disableButton = await (await modal.onWillDismiss()).data;
  }

  public valueChanges(month: number): void {
    this.getData(month);
  }

  private getData(month: number): void {
    this.subscription = this.expensesService.getAll(month)
      .subscribe((data) => { this.loading = false; this.expenses = data; });

    this.subscription.add(this.calculateService.getAll(month)
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } }
      ));
  }
}
