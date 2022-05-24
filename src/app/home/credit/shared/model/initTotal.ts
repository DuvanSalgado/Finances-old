import { ITotal } from './credit.interface';

export class InicTotal {
  public total: ITotal = {
    expenseCredit: 0,
    expenseDebit: 0,
    expenseCash: 0,

    totalCredit: 0,
    totalDebit: 0,

    pendingCredit: 0,
    pendingDebit: 0,
    pendingCash: 0,

    paymentCredit: 0,
    paymentDebit: 0,
    paymentCash: 0,
  };
}
