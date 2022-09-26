import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormInvestmetsCtrl } from '../model/formEnumCtrl';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html'
})
export class CreateModalComponent {

  @Input() formGroup: FormGroup;
  public formCtrl = FormInvestmetsCtrl;

  constructor(
    private modalCtrl: ModalController
  ) { }

  public onSaveChange(event: any): void {
    this.modalCtrl.dismiss();
  }

  public onCloseModal(): void {
    this.resetForm();
    this.modalCtrl.dismiss();
  }

  private resetForm(): void {
    this.formGroup.controls[this.formCtrl.value].reset();
  }
}
