import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ITEMSMONTH } from '@shared/combobox/model/data.combobox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html'
})
export class AddButtonsComponent implements OnInit, OnDestroy {

  @Output() changeEvent = new EventEmitter<number>();

  public itemsmonth = ITEMSMONTH.filter(data => data.id <= new Date().getMonth());
  public currentMonth = new Date().getMonth();
  public month = new FormControl({ name: '', id: this.currentMonth });

  private subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.valueChanges();
  }

  public refresh(): void {
    this.month.setValue({ name: '', id: this.currentMonth }, {
      emitEvent: false
    });
  }

  private valueChanges(): void {
    this.subscription = this.month.valueChanges
      .subscribe(data => this.changeEvent.emit(data.id));
  }
}
