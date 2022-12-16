import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';

@Injectable()

export class AuthService {

  constructor(
    private afAuth: Auth,
    private router: Router,
  ) { }

  public loginEmailPassword(user: IUser): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, user.email, user.password);
  }

  public validationUserInfo(): void {
    this.afAuth.onAuthStateChanged((data) => {
      if (data) { this.router.navigate(['/home']); }
      else { this.router.navigate(['/login']); }
    }, () => {
      this.router.navigate(['/login'])
    });
  }
}
