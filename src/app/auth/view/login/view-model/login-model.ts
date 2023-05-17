import { FormGroup } from '@angular/forms';
import { IUser } from '@app/auth/shared/interfaces/user.interface';
import { CorePresenter } from '@app/domain/abtraccion/core.presenter';

export abstract class LoginOutputLogic {
  public formGroup: FormGroup;
  public loading = false;
}

export interface LoginInputLogic extends CorePresenter {
  login(userInfo: IUser): Promise<void>;
}
