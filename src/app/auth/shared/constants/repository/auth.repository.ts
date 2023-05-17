import { IUser } from '../../interfaces/user.interface';


export interface AuthRepository {
  loginEmailPassword(user: IUser): Promise<any>;
  validationUserInfo(): void;
}
