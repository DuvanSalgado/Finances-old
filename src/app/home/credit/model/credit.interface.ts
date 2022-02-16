import { ICombobox } from '@app/shared/combobox/model/combobox.interface';
export interface IcreditModel {
  id?: string;
  name: string;
  value: number;
  month: number;
  status: ICombobox;
  date: Date;
}
