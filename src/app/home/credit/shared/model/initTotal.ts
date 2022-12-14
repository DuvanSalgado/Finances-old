import { ITotal } from './credit.interface';

export class InicTotal {
  public total: ITotal = {
    id: null,
    year: new Date().getFullYear(),
    expenseCredit: 0,
    expenseDebit: 0,
    expenseCash: 0,

    totalCredit: 0,
    totalDebit: 0,

    loansCash: 0,
    loansDebit: 0,
    loansCredit: 0
  };
}
