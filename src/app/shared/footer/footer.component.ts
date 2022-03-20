import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITotal } from '@app/home/credit/shared/model/credit.interface';
import { CalculateService } from '@app/home/credit/shared/service/calculate.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [CalculateService]
})
export class FooterComponent implements OnInit, OnDestroy {

  public total: Array<ITotal> = [];

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
      .subscribe((data) => this.total = data);
  }

}
