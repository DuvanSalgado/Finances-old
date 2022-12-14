import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IcashGeneral, ITotal } from '../../shared/model/credit.interface';
import { LoansFormModel } from '../shared/model/loans-form.model';

@Injectable()
export class OperationCash extends LoansFormModel {

  constructor(
    protected formBuilder: FormBuilder,
  ) {
    super(formBuilder);
  }

  public override  patchFormLoans(): void {
    this.getFormGroup
      .patchValue({
        [this.formCtrl.icon]: { icon: 'cash-outline', labelColor: 'success' },
        [this.formCtrl.type]: 'Efectivo'
      });
  }

  public operationsPaymentCash(cashGeneral: IcashGeneral): void {
    if (this.isCash) cashGeneral.value += this.getValue;
  }

  public override operations(total: ITotal, cashGeneral: IcashGeneral): void {
    total.loansCash += this.getValue;
    cashGeneral.value -= this.getValue;
  }
}
