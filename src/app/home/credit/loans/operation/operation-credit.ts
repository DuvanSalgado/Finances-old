import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IcashGeneral, ITotal } from '../../shared/model/credit.interface';
import { LoansFormModel } from '../shared/model/loans-form.model';

@Injectable()
export class OperationCredit extends LoansFormModel {

  constructor(
    protected formBuilder: FormBuilder,
  ) {
    super(formBuilder);
  }

  public override  patchFormLoans(): void {
    this.getFormGroup
      .patchValue({
        [this.formCtrl.icon]: { icon: 'card-outline', labelColor: 'warning' },
        [this.formCtrl.type]: 'Credito'
      });
  }

  public override operations(total: ITotal): void {
    total.loansCredit += this.getValue;
    total.totalCredit += this.getValue;
  }
}
