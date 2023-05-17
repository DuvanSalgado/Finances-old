import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@app/core/services/loading.service';
import { IUser } from '../shared/interfaces/user.interface';
import { LoginInputLogic, LoginOutputLogic } from '../view/login/view-model/login-model';

@Injectable()

export class LoginPresenter implements LoginInputLogic {

  private view: LoginOutputLogic;

  constructor(
    @Inject('loginInteractorProvider') private interactor: LoginInputLogic,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  public setView(component: LoginOutputLogic): void {
    this.view = component;
  }

  async login(userInfo: IUser): Promise<void> {
    try {
      this.view.loading = true;
      await this.interactor.login(userInfo);
      this.router.navigate(['/home']);
    } catch (error) {
      this.view.loading = false;
      this.loadingService.presentToast('Usuario y contraseña invalidos');
    }
  }
}
