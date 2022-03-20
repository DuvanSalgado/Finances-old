import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalFormCreditComponent } from './modal-form-credit/form-credit.component';
import { IcreditModel, IExpensesModel, ITotal } from './shared/model/credit.interface';
import { Section } from './shared/model/section.enum';
import { CreditService } from './shared/service/credit.service';
import { CalculateService } from './shared/service/calculate.service';
import { ExpensesService } from './shared/service/expenses.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
})
export class CreditComponent implements OnInit, OnDestroy {

  public data: Array<IcreditModel> = [];
  public expenses: Array<IExpensesModel> = [];
  public loading = true;
  public loadingExpense = true;
  public selectedSection = Section.expenses;
  public total: Array<ITotal> = [];

  private subscription: Array<Subscription> = [];

  constructor(
    private modalController: ModalController,
    private creditService: CreditService,
    private calculateService: CalculateService,
    private expensesService: ExpensesService
  ) { }

  ngOnDestroy(): void {
    this.subscription.forEach(element =>
      element.unsubscribe());
  }

  ngOnInit(): void {
    this.getData();
  }

  update(data: IcreditModel): void {
    this.openModal(data, 'Actulización de datos', false, false);
  }

  segmentChanged(event: any): void {
    this.selectedSection = event.detail.value;
  }

  create(): void {
    this.openModal(null, 'Crear un nuevo registro', true, false);
  }

  view(data: IcreditModel): void {
    this.openModal(data, 'Vista de detalles', false, true);
  }

  private getData(): void {
    this.subscription.push(this.calculateService.getAll()
      .subscribe((data) => this.total = data
      ));

    this.subscription.push(this.creditService.getAllCredit()
      .subscribe((data) => { this.loading = false; this.data = data; }));

    this.subscription.push(this.expensesService.getAll()
      .subscribe((data) => { this.loadingExpense = false; this.expenses = data; }));

  }

  private async openModal(data: IcreditModel, title: string, isCreate: boolean, isView: boolean): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalFormCreditComponent,
      componentProps: { data, isCreate, isView, title }
    });
    return await modal.present();
  }

}
