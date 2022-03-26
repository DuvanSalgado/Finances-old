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
  cash: boolean;
}

export interface ITotal {
  month?: number;
  cashReference?: number;
  expense?: number;
  missing?: number;
  loan?: number;
  cash?: number;
  id?: string;
}
