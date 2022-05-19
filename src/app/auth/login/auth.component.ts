import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthModel } from '../shared/model/auth.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends AuthModel {

  formGroup: FormGroup = this.formAuth();;

  constructor(
    protected formbuild: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super(formbuild);
  }

  public async login(): Promise<void> {
    await this.authService.loginEmailPassword(this.formGroup.value)
      .then(() => this.router.navigate(['/home']))
      .catch((error: FirebaseError) => console.log(error.message));
  }
}
