import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternEmail } from '../constants/patter';
import { FormAuthCtrl } from '../enums/form.enum';

export class AuthModel {

  constructor(protected formBuilder: FormBuilder) { }

  public formAuth(): FormGroup {
    return this.formBuilder.group({
      [FormAuthCtrl.email]: ['dsalgado012@gmail.com', [Validators.required, Validators.pattern(patternEmail)]],
      [FormAuthCtrl.password]: ['DuvanSalgado', [Validators.required, Validators.minLength(6)]]
    });
  }

}
