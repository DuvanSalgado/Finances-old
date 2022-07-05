import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormMotoCtrl } from '../shared/models/moto-Form';

@Component({
  selector: 'app-moto-modal-add',
  templateUrl: './moto-modal-add.component.html'
})
export class MotoModalAddComponent implements OnInit {

  @Input() formGroup: FormGroup;
  public formCtrl = FormMotoCtrl;

  constructor(private modalController: ModalController) { }

  ngOnInit(): void { }

  cancelModal(): void {
    this.formGroup.controls[this.formCtrl.kilometraje].reset();
    this.formGroup.controls[this.formCtrl.kilometrajeProx].reset();
    this.modalController.dismiss(false);
  }

  onSaveChange(event: boolean): void {
    this.modalController.dismiss(false);
  }

}
