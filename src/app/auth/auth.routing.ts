import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateSesionComponent } from './view/validate-sesion/validate-sesion.component';
import { LoginComponent } from './view/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ValidateSesionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
