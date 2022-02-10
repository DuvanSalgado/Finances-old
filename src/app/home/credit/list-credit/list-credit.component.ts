import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormCreditComponent } from '../form-credit/form-credit.component';

@Component({
  selector: 'app-list-credit',
  templateUrl: './list-credit.component.html',
  styleUrls: ['./list-credit.component.scss'],
})
export class ListCreditComponent implements OnInit {

  items: any[] = [{
    name: 'duvan',
    value: '50.000',
    date: '10/10/2022'
  }, {
    name: 'duvan',
    value: '50.000',
    date: '10/10/2022'
  }, {
    name: 'duvan',
    value: '50.000',
    date: '10/10/2022'
  }, {
    name: 'duvan',
    value: '50.000',
    date: '10/10/2022'
  }];

  constructor(private modalController: ModalController) { }

  ngOnInit(): void { }

  async updateStatus(item: any): Promise<void> {
    const modal = await this.modalController.create({
      component: FormCreditComponent,
      componentProps: { data: item }
    });
    return await modal.present();
  }

}
