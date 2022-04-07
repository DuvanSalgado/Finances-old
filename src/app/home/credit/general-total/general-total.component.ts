import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITotal } from '../shared/model/credit.interface';
import { CalculateService } from '@credit/service/calculate.service';

@Component({
  selector: 'app-general-total',
  templateUrl: './general-total.component.html',
  styleUrls: ['./general-total.component.scss'],
})
export class GeneralTotalComponent implements OnInit, OnDestroy {

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
    this.getData();
  }

  getData(): void {
    this.subscription = this.calculateService.getAll()
      .subscribe((data) => { if (data.length > 0) { this.total = data[0]; } });
  }

}
