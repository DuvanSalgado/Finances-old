import { ICombobox } from '@app/shared/combobox/model/combobox.interface';
export interface IcreditModel {
  id?: string;
  name: string;
  pendingValue: number;
  value: number;
  month: number;
  status: ICombobox;
  fullValue: number;
  date: Date;
  paidValue: number;
  history: IHistory[];
}

export type IHistory = Pick<IcreditModel, 'date' | 'value' | 'status'>;

export interface IExpensesModel {
  value: number;
  description: string;
  date: Date;
  month: number;
}

export interface ITotal {
  month: number;
  expenses?: number;
  loan?: number;
  id?: string;
}
