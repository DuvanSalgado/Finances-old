import { Iicons } from '@app/home/credit/shared/model/credit.interface';

export interface IExpensesModel {
  value: number;
  description: string;
  date: Date;
  month: number;
  type: string;
  icon: Iicons;
}
