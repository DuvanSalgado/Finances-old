import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '@app/core/services/loading.service';
import { AuthModel } from '../shared/model/auth.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends AuthModel {

  public formGroup: FormGroup = this.formAuth();;
  public loading = false;

  constructor(
    protected formbuild: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    super(formbuild);
  }

  public async login(): Promise<void> {
    try {
      await this.authService.loginEmailPassword(this.formGroup.value);
      this.router.navigate(['/home']);
      this.loading = true;
    } catch (error) {
      this.loadingService.presentToast(error);
    }
  }
}
