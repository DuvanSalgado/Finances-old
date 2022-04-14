import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculateService } from '@credit/service/calculate.service';
import { Subscription } from 'rxjs';
import { ITotal } from '../shared/model/credit.interface';
import { InicTotal } from '../shared/model/initTotal';

@Component({
  selector: 'app-general-total',
  templateUrl: './general-total.component.html',
  styleUrls: ['./general-total.component.scss'],
})
export class GeneralTotalComponent implements OnInit, OnDestroy {

  public currentMonth = new Date().getMonth();
  public total: ITotal = new InicTotal().total;

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
