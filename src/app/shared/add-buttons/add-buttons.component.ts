import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITEMSMONTH } from '../combobox/model/data.combobox';

@Component({
  selector: 'app-add-buttons',
  templateUrl: './add-buttons.component.html'
})
export class AddButtonsComponent implements OnInit, OnDestroy {

  @Output() changeEvent = new EventEmitter<number>();

  public itemsmonth = ITEMSMONTH;
  public currentMonth = new Date().getMonth();
  public month = new FormControl({ name: '', id: this.currentMonth });

  private subscription: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.valueChanges();
  }

  private valueChanges(): void {
    this.subscription = this.month.valueChanges
      .subscribe(data => this.changeEvent.emit(data.id));
  }
}
