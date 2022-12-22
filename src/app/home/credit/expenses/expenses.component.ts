import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IcashGeneral } from '../shared/model/credit.interface';
import { CalculateService } from '../shared/service/calculate.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, OnDestroy {

  public cashGeneral: IcashGeneral = { id: null, value: 0 };
  private subscription: Subscription;

  constructor(private calculateService: CalculateService) { }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.subscription = (this.calculateService.getAllCash()
      .subscribe((cash) => {
        if (cash.length > 0) this.cashGeneral = cash[0];
      }));
  }
}

