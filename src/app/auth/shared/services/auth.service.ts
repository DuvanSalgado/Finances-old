import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUser } from '../interfaces/user.interface';

@Injectable()

export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  public loginEmailPassword(user: IUser): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword( user.email, user.password);
  }
}
