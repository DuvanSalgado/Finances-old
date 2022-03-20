import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IExpensesModel } from '../model/credit.interface';

@Injectable()
export class ExpensesService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private month = new Date().getMonth();

  constructor(private fireBase: AngularFirestore) { }

  getAll() {

  }

  create(data: IExpensesModel): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IExpensesModel>('expenses');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }
}
