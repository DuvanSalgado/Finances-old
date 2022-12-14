import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IcashGeneral, ITotal } from '../../shared/model/credit.interface';
import { LoansFormModel } from '../shared/model/loans-form.model';

@Injectable()
export class OperationDebit extends LoansFormModel {

  constructor(
    protected formBuilder: FormBuilder,
  ) {
    super(formBuilder);
  }

  public override patchFormLoans(): void {
    this.getFormGroup
      .patchValue({
        [this.formCtrl.icon]: { icon: 'reader-outline', labelColor: 'primary' },
        [this.formCtrl.type]: 'Debito'
      });
  }

  public override operations(total: ITotal): void {
    total.loansDebit += this.getValue;
    total.totalDebit += this.getValue;
  }
}
