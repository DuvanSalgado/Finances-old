import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-expenses',
  templateUrl: './modal-add-expenses.component.html',
  styleUrls: ['./modal-add-expenses.component.scss'],
})
export class ModalAddExpensesComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  cancel(): void {
    this.modalController.dismiss();
  }

}
