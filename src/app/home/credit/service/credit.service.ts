import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { IcreditModel } from '../model/credit.interface';

@Injectable()
export class CreditService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private fireBase: AngularFirestore) { }

  createCredit(data: IcreditModel): Promise<DocumentReference<any>> {
    this.itemsCollection = this.fireBase.collection<IcreditModel>('credit');
    return this.itemsCollection.add(JSON.parse(JSON.stringify(data)));
  }
}
