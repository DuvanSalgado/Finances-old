import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-validate-sesion',
  templateUrl: './validate-sesion.component.html',
  styleUrls: ['./validate-sesion.component.scss']
})
export class ValidateSesionComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validationUserInfo();
  }

}
