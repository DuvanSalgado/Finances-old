import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html',
  styleUrls: ['./form-credit.component.scss'],
})
export class FormCreditComponent implements OnInit {

  @Input() data: any;

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  cancel(): void {
    this.modalController.dismiss();
  }

}
