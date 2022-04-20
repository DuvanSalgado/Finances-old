import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IcreditModel } from '@credit/model/credit.interface';

@Component({
  selector: 'app-modal-details-loans',
  templateUrl: './modal-details-loans.component.html',
  styleUrls: ['./modal-details-loans.component.scss']
})
export class ModalDetailsLoansComponent {

  @Input() data: IcreditModel;

  constructor(private modalController: ModalController) { }

  public cancel(): void {
    this.modalController.dismiss(false);
  }
}
