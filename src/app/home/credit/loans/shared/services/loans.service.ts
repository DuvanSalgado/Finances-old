import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IcreditModel } from '@credit/model/credit.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoansService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private fireBase: AngularFirestore) { }

  createLoans(data: IcreditModel): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel>('Loans');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }

  public async updateCredit(data: any): Promise<void> {
    this.itemsCollection = this.fireBase.collection<any>('Loans');
    return await this.itemsCollection.doc(data.id).update(JSON.parse(JSON.stringify(data)));
  }

  public getAllCredit(): Observable<Array<IcreditModel>> {
    this.itemsCollection = this.fireBase
      .collection<IcreditModel[]>('Loans', (ref) => ref.where('pendingValue', '>', 0));

    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        return {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        }
      })));
  }

}
