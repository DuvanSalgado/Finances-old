import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITEMSMONTH } from '@app/shared/combobox/model/data.combobox';
import { CalculateService } from '@credit/service/calculate.service';
import { Subscription } from 'rxjs';
import { ITotal } from '../shared/model/credit.interface';

@Component({
  selector: 'app-general-total',
  templateUrl: './general-total.component.html',
  styleUrls: ['./general-total.component.scss'],
})
export class GeneralTotalComponent implements OnInit, OnDestroy {

  public currentMonth = new Date().getMonth();
  public total: ITotal = {
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

  constructor(private calculateService: CalculateService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getData(this.currentMonth);
  }

  public valueChanges(month: number): void {
    this.getData(month);
  }

  private getData(month: number): void {
    this.subscription = this.calculateService.getAll(month)
      .subscribe((data) => this.total = data[0]);
  }

}
