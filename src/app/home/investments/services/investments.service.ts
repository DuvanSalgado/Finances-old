import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IInvestments } from '../model/model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class InvestmentsService {

  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(private fireBase: AngularFirestore) { }

  public create(data: IInvestments): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IInvestments>('investments');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }

  public getAll(): Observable<Array<IInvestments>> {
    this.itemsCollection = this.fireBase.collection<any>('investments');
    return this.itemsCollection.snapshotChanges().pipe(
      map(data => data.map((d) => {
        const retorno = {
          ...d.payload.doc.data(),
          id: d.payload.doc.id
        };
        return retorno;
      })));
  }
}
