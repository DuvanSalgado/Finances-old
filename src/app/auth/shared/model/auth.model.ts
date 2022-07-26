import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternEmail } from '../constants/patter';
import { FormAuthCtrl } from '../enums/form.enum';

export class AuthModel {

  constructor(protected formBuilder: FormBuilder) { }

  public formAuth(): FormGroup {
    return this.formBuilder.group({
      [FormAuthCtrl.email]: ['alexa09santos@gmail.com', [Validators.required, Validators.pattern(patternEmail)]],
      [FormAuthCtrl.password]: ['1100696361', [Validators.required, Validators.minLength(6)]]
    });
  }

}
