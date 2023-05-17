import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { patternEmail } from '@app/auth/shared/constants/patter';
import { FormAuthCtrl } from '@app/auth/shared/enums/form.enum';
import { LoginInputLogic, LoginOutputLogic } from './view-model/login-model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoginOutputLogic implements OnInit {

  constructor(
    @Inject('loginPresenterProvider') private presenter: LoginInputLogic,
    private formBuilder: FormBuilder
  ) {
    super();
    this.presenter.setView(this);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [FormAuthCtrl.email]: ['dsalgado012@gmail.com', [Validators.required, Validators.pattern(patternEmail)]],
      [FormAuthCtrl.password]: ['DuvanSalgado', [Validators.required, Validators.minLength(6)]]
    });
  }

  public login(): void {
    this.presenter.login(this.formGroup.value);
  }
}
