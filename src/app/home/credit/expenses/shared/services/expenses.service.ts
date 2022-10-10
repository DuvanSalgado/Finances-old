import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IExpensesModel } from '../model/interfaces/expenses';

@Injectable()
export class ExpensesService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private year = new Date().getFullYear();

  constructor(private fireBase: AngularFirestore) { }

  getAllForMont(month: number, table: string): Observable<Array<IExpensesModel>> {
    this.itemsCollection = this.fireBase
      .collection<IExpensesModel[]>(table, ref => ref.where('month', '==', month)
        .where('year', '==', this.year));
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

  deleteItem(id: string, table: string): Promise<void> {
    this.itemsCollection = this.fireBase.collection<any>(table);
    return this.itemsCollection.doc(id).delete();
  }

  create(data: IExpensesModel, table: string): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IExpensesModel>(table);
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }
}
