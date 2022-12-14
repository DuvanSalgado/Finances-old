import { ICombobox } from '@app/shared/combobox/model/combobox.interface';
export interface IcreditModel {
  id?: string;
  name: string;
  pendingValue: number;
  value: number;
  month: number;
  type: ICombobox;
  status: ICombobox;
  operation: ICombobox;
  icon: Iicons;
  paymentMethod: ICombobox;
  fullValue: number;
  date: Date;
  reason: string;
  paidValue: number;
  historyLoan: IHistoryLoan[];
  historyPayment: IhistoryPayment[];
}

export interface IHistoryLoan {
  date: Date;
  value: number;
  reason: string;
  icon: Iicons;
}
export type IhistoryPayment = Pick<IcreditModel, 'date' | 'value' | 'paymentMethod'>;

export interface ITotal {
  id?: string;
  month?: number;
  year?: number;

  expenseCredit?: number;
  expenseDebit?: number;
  expenseCash?: number;

  totalCredit?: number;
  totalDebit?: number;

  loansCredit?: number;
  loansDebit?: number;
  loansCash?: number;
}

export interface Iicons {
  labelColor: string;
  icon: string;
}

export interface IcashGeneral {
  id?: string;
  value: number;
}
