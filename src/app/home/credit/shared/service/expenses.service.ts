import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IExpensesModel } from '../model/credit.interface';

@Injectable()
export class ExpensesService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private month = new Date().getMonth();

  constructor(private fireBase: AngularFirestore) { }

  getAll(): Observable<Array<IExpensesModel>> {
    this.itemsCollection = this.fireBase.collection<IExpensesModel[]>('expenses', ref => ref.where('month', '>=', this.month));
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

  create(data: IExpensesModel): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IExpensesModel>('expenses');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }
}
