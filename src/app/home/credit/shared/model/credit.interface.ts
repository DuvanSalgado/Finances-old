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
  fullValue: number;
  date: Date;
  paidValue: number;
  history: IHistory[];
}

export type IHistory = Pick<IcreditModel, 'date' | 'value' | 'operation'>;


export interface ITotal {
  month?: number;
  expenseCredit?: number;
  expenseCash?: number;
  totalCredit?: number;
  pendingCredit?: number;
  loanCredit?: number;
  expenseDebit?: number;
  totalDebit?: number;
  pendingDebit?: number;
  loanDebit?: number;
  id?: string;
}

export interface Iicons {
  labelColor: string;
  icon: string;
}

export interface IcashGeneral {
  id?: string;
  value: number;
}
