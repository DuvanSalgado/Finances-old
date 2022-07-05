export interface IMoto {
  kilometraje: number;
  date: string;
  month: number;
  dateProx: string;
  kilometrajeProx: number;
}

export enum FormMotoCtrl {
  kilometraje = 'kilometraje',
  date = 'date',
  month = 'month',
  dateProx = 'dateProx',
  kilometrajeProx = 'kilometrajeProx'
}
