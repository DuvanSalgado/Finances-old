import { Inject, Injectable } from '@angular/core';
import { AuthRepository } from '../shared/constants/repository/auth.repository';
import { IUser } from '../shared/interfaces/user.interface';
@Injectable()

export class LoginInteractor {

  constructor(@Inject('AuthRepository') private authService: AuthRepository) { }

  public async login(userInfo: IUser): Promise<any> {
    await this.authService.loginEmailPassword(userInfo);
  }
}
