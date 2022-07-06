import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './login/auth.component';
import { ValidateSesionComponent } from './validate-sesion/validate-sesion.component';

const routes: Routes = [
  {
    path: '',
    component: ValidateSesionComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
