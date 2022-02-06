import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class FormCreditComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  options(event: boolean): void {
    console.log(event);
  }

}
