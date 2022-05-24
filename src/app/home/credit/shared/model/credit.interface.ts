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

export type IHistory = Pick<IcreditModel, 'date' | 'value' | 'type'>;


export interface ITotal {
  id?: string;
  month?: number;

  expenseCredit?: number;
  expenseDebit?: number;
  expenseCash?: number;

  totalCredit?: number;
  totalDebit?: number;

  pendingCredit?: number;
  pendingDebit?: number;
  pendingCash?: number;

  paymentCredit?: number;
  paymentDebit?: number;
  paymentCash?: number;
}

export interface Iicons {
  labelColor: string;
  icon: string;
}

export interface IcashGeneral {
  id?: string;
  value: number;
}
