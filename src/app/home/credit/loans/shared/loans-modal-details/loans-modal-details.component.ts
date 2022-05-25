import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IcreditModel } from '@credit/model/credit.interface';

@Component({
  selector: 'app-modal-details-loans',
  templateUrl: './loans-modal-details.component.html',
  styleUrls: ['./loans-modal-details.component.scss']
})
export class LoansModalDetailsComponent {

  @Input() data: IcreditModel;

  constructor(private modalController: ModalController) { }

  public cancel(): void {
    this.modalController.dismiss(false);
  }
}
