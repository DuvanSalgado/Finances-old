import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAddExpensesComponent } from '../modal-add-expenses/modal-add-expenses.component';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss'],
})
export class ListExpensesComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async openModalCreate(): Promise<void> {
    const modal = await this.modalController.create({
      component: ModalAddExpensesComponent,
    });
    return await modal.present();
  }
}

