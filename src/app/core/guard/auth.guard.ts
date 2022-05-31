import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

  credentials = false;

  constructor(
    private afAuth: Auth,
    private router: Router
  ) { }

  public canActivate(): boolean {

    const userInfo = localStorage.getItem('userInfo');

    this.afAuth.onAuthStateChanged((data) => {
      if (!data) { this.router.navigate(['/']); }
    });

    if (!userInfo) { this.router.navigate(['/']); }

    return (userInfo) ? true : false;
  }

}
