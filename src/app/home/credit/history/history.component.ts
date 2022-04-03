import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITEMSEXPENSE, ITEMSMONTH, ITEMSTABLES } from '@app/shared/combobox/model/data.combobox';
import { Subscription } from 'rxjs';
import { FormShared } from '../shared/model/formCredit.enum';
import { SearchService } from '../shared/service/search.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [SearchService]
})
export class HistoryComponent implements OnInit, OnDestroy {

  public itemsmonth = ITEMSMONTH;
  public itemsType = ITEMSTABLES;
  public formGroup: FormGroup;
  public formCtrl = FormShared;
  public loading = false;
  public data: Array<any>;
  private subscription: Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private searchService: SearchService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public searchItems(): void {

    this.loading = true;
    const table = this.formGroup.get(this.formCtrl.table).value.id;
    const month = parseInt(this.formGroup.get(this.formCtrl.month).value.id, 10);

    this.subscription = this.searchService.search(table, month)
      .subscribe(data => { this.data = data; this.loading = false; });
  }

  private initializeForm(): void {
    this.formGroup = this.formbuilder.group({
      [this.formCtrl.month]: [null, Validators.required],
      [this.formCtrl.table]: [null, Validators.required]
    });
  }
}
