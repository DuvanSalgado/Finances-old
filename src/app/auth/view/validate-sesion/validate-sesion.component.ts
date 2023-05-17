import { Component, Inject, OnInit } from '@angular/core';
import { AuthRepository } from '@app/auth/shared/constants/repository/auth.repository';

@Component({
  selector: 'app-validate-sesion',
  templateUrl: './validate-sesion.component.html',
  styleUrls: ['./validate-sesion.component.scss']
})
export class ValidateSesionComponent implements OnInit {

  constructor(@Inject('AuthRepository') private authService: AuthRepository) { }

  ngOnInit(): void {
    this.validateUserInfo();
  }

  validateUserInfo(): void {
    this.authService.validationUserInfo();
  }

}
