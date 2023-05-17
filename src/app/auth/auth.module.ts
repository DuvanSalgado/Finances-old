import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth.routing';
import { LoginInteractor } from './interactor/login-interactor';
import { LoginPresenter } from './presenter/login.presenter';
import { AuthService } from './shared/services/auth.service';
import { LoginComponent } from './view/login/login.component';
import { ValidateSesionComponent } from './view/validate-sesion/validate-sesion.component';

@NgModule({
  declarations: [
    LoginComponent,
    ValidateSesionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [
    LoadingService,
    {
      provide: 'loginPresenterProvider',
      useClass: LoginPresenter
    },
    {
      provide: 'loginInteractorProvider',
      useClass: LoginInteractor
    },
    {
      provide: 'AuthRepository',
      useClass: AuthService
    },
  ]
})
export class AuthModule { }
