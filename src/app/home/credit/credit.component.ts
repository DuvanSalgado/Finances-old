import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IcreditModel, IExpensesModel, ITotal } from './shared/model/credit.interface';
import { Section } from './shared/model/section.enum';
import { CalculateService } from './shared/service/calculate.service';
import { CreditService } from './shared/service/credit.service';
import { ExpensesService } from './shared/service/expenses.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
})
export class CreditComponent implements OnInit, OnDestroy {

  public loans: Array<IcreditModel> = [];
  public expenses: Array<IExpensesModel> = [];
  public loadingLoans = true;
  public loadingExpense = true;
  public selectedSection = Section.expenses;
  public total: Array<ITotal> = [{ expense: 0, loan: 0, cash: 0, cashReference: 0 }];

  private subscription: Array<Subscription> = [];

  constructor(
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

  segmentChanged(event: any): void {
    this.selectedSection = event.detail.value;
  }

  private getData(): void {
    this.subscription.push(this.calculateService.getAll()
      .subscribe((data) => { if (data.length > 0) { this.total = data; } }
      ));

    this.subscription.push(this.creditService.getAllCredit()
      .subscribe((data) => { this.loadingLoans = false; this.loans = data; }));

    this.subscription.push(this.expensesService.getAll()
      .subscribe((data) => { this.loadingExpense = false; this.expenses = data; }));
  }

}
