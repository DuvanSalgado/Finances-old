import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/auth/shared/services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  credentials = false;

  constructor(
  /*   private afAuth: AngularFireAuth,
    private router: Router,
    private authservice: AuthService */
  ) {
    //  this.validateCredentials();
  }


  canActivate() {
    /*  let credentials = true;
       if (getAuth()) {
        credentials = true;
      } else {
        this.router.navigate(['/']);
        credentials = false;
      } */

    //this.validateCredentials();
    console.log('primero');
    console.log(getAuth().currentUser);

    return true;
  }



}
