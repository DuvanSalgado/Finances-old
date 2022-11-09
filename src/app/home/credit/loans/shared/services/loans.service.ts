import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IcreditModel } from '@credit/model/credit.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoansService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private year = new Date().getFullYear();

  constructor(private fireBase: AngularFirestore) { }

  createLoans(data: IcreditModel, table: string): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel>(table);
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }

  async updateCredit(data: any, table: string): Promise<void> {
    this.itemsCollection = this.fireBase.collection<any>(table);
    return await this.itemsCollection.doc(data.id).update(JSON.parse(JSON.stringify(data)));
  }

  public getAllCredit(table: string): Observable<Array<IcreditModel>> {
    this.itemsCollection = this.fireBase
      .collection<IcreditModel[]>(table, (ref) => ref.where('year', '==', this.year));

    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        return {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        }
      })));
  }

}
