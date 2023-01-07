import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IcashGeneral, ITotal } from '@credit/model/credit.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CalculateService {

  private itemsCollection: AngularFirestoreCollection<any>;
  private year = new Date().getFullYear();

  constructor(private fireBase: AngularFirestore) { }

  public getAllTotal(month: number): Observable<Array<ITotal>> {
    this.itemsCollection = this.fireBase
      .collection<Array<ITotal>>('Total', ref => ref.where('month', '==', month).
        where('year', '==', this.year));

    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

  public getAllCash(): Observable<Array<IcashGeneral>> {
    this.itemsCollection = this.fireBase.collection<any>('CashGeneral');
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

  public async calculate(data: ITotal, month?: number): Promise<void | DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<any>('Total');
    if (data.id) {
      return await this.itemsCollection.doc(data.id).update(JSON.parse(JSON.stringify(data)));
    } else {
      return await this.itemsCollection.add(JSON.parse(JSON.stringify({ ...data, month })));
    }
  }

  public async cashGeneral(data: IcashGeneral): Promise<void | DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<any>('CashGeneral');
    if (data.id) {
      return await this.itemsCollection.doc(data.id).update(JSON.parse(JSON.stringify(data)));
    } else {
      return await this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
    }
  }
}
