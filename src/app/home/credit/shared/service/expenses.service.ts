import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IExpensesModel } from '@credit/model/credit.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExpensesService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private fireBase: AngularFirestore) { }

  getAll(month: number): Observable<Array<IExpensesModel>> {
    this.itemsCollection = this.fireBase.collection<IExpensesModel[]>('expenses', ref => ref.where('month', '==', month));
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
