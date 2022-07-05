import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingService } from '@app/core/services/loading.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()

export class AuthService {

  constructor(
    private afAuth: Auth,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  public loginEmailPassword(user: IUser): Promise<any> {
    return signInWithEmailAndPassword(this.afAuth, user.email, user.password);
  }

  public setLocalStore(): void {
    localStorage.setItem('userInfo', JSON.stringify(this.afAuth.currentUser));
  }

  public validationUserInfo(): void {
    this.loadingService.presentLoading();
    this.afAuth.onAuthStateChanged((data) => {
      if (data) { this.router.navigate(['/home']); }
      this.loadingService.dismiss();
    });
  }
}
