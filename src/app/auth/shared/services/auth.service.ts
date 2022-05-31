import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { IUser } from '../interfaces/user.interface';

@Injectable()

export class AuthService {

  constructor(private afAuth: Auth) { }

  public loginEmailPassword(user: IUser): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, user.email, user.password);
  }

  public setLocalStore(): void {
    localStorage.setItem('userInfo', JSON.stringify(this.afAuth.currentUser));
  }
}
