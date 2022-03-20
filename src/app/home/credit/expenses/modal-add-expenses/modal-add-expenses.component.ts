import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ITotal } from '../../shared/model/credit.interface';
import { FormExpensesCtrl } from '../../shared/model/formCredit.enum';
import { CalculateService } from '../../shared/service/calculate.service';
import { ExpensesService } from '../../shared/service/expenses.service';
@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './modal-add-expenses.component.html',
  styleUrls: ['./modal-add-expenses.component.scss'],
})
export class ModalAddExpensesComponent implements OnInit {

  @Input() total: Array<ITotal>;

  public loading = false;
  public formGroup: FormGroup;
  public formCtrl = FormExpensesCtrl;

  private todayDate = new Date();

  constructor(
    private modalController: ModalController,
    private formbuilder: FormBuilder,
    private calculateService: CalculateService,
    private expensesService: ExpensesService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  public async onSaveChange(evet: boolean): Promise<void> {
    await this.calculate();
    await this.expensesService.create(this.formGroup.value);
    await this.modalController.dismiss();
  }

  private initializeForm(): void {
    this.formGroup = this.formbuilder.group({
      [this.formCtrl.value]: [null, [Validators.required]],
      [this.formCtrl.description]: [null, [Validators.required]],
      [this.formCtrl.date]: [format(this.todayDate, 'MMM dd yyyy')],
      [this.formCtrl.month]: [this.todayDate.getMonth()]
    });
  }

  private async calculate(): Promise<void> {
    const reques = {
      ...this.total[0],
      expense: parseInt(this.formGroup.get(this.formCtrl.value).value, 10),
    };
    await this.calculateService.calculate(reques);
  }
}
