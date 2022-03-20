import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ITotal } from '../../shared/model/credit.interface';
import { FormExpensesCtrl } from '../../shared/model/formCredit.enum';
import { CalculateService } from '../../shared/service/calculate.service';
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
    private expensesService: CalculateService
  ) { }


  ngOnInit() {
    this.initializeForm();
  }

  cancel(): void {
    this.modalController.dismiss();
  }

  public onSaveChange(evet: boolean): void {
    this.calculate();
    console.log(this.formGroup.value);
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
    const value = parseInt(this.formGroup.get(this.formCtrl.value).value, 10);
    console.log(this.total);

    const reques = {
      ...this.total[0],
      gastos: value,
    };

    await this.expensesService.calculate(reques);
  }

}
