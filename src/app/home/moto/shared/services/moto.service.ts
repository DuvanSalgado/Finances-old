import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMoto } from '../models/moto-Form';

@Injectable()
export class MotoService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private fireBase: AngularFirestore) { }

  public getAll(month: number): Observable<Array<IMoto>> {
    this.itemsCollection = this.fireBase.collection<any>('CambioAceite', ref => ref.where('month', '<=', month));
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

  public getReferencia(): Observable<Array<any>> {
    this.itemsCollection = this.fireBase.collection<any>('referecia');
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }

 public create(data: IMoto): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IMoto>('CambioAceite');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }
}
