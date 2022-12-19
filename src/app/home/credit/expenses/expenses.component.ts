import { Component, OnInit } from '@angular/core';
import { IcashGeneral } from '../shared/model/credit.interface';
import { CalculateService } from '../shared/service/calculate.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {

  public cashGeneral: IcashGeneral = { id: null, value: 0 };
  private subscription
  constructor(private calculateService: CalculateService) { }

  ngOnInit(): void {
    this.subscription = (this.calculateService.getAllCash()
      .subscribe((cash) => {
        if (cash.length > 0) this.cashGeneral = cash[0];
      }));
  }
}

