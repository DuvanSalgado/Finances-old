import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IcreditModel } from '@credit/model/credit.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class CreditService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private fireBase: AngularFirestore) { }

  createCredit(data: IcreditModel): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel>('credit');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }

  getAllCredit(month: number): Observable<Array<IcreditModel>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel[]>('credit', ref => ref.where('month', '==', month));
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

  async updateCredit(data: any): Promise<void> {
    this.itemsCollection = this.fireBase.collection<any>('credit');
    return await this.itemsCollection.doc(data.id).update(JSON.parse(JSON.stringify(data)));
  }
}
