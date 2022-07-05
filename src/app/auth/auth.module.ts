import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth.routing';
import { AuthComponent } from './login/auth.component';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    LoadingService
  ]
})
export class AuthModule { }
