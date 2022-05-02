import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { IcashGeneral } from '../../shared/model/credit.interface';
import { mensages } from '../../shared/model/menssage';
import { CalculateService } from '../../shared/service/calculate.service';

@Component({
  selector: 'app-modal-cash',
  templateUrl: './modal-cash.component.html',
  providers: [LoadingService]
})
export class ModalCashComponent {

  @Input() data: IcashGeneral;

  public value = new FormControl(null, Validators.required);

  constructor(
    private modalController: ModalController,
    private calculateService: CalculateService,
    private loadingService: LoadingService
  ) { }

  public async cancelModal(): Promise<void> {
    await this.modalController.dismiss(true);
  }

  public async onSaveChange(event) {
    this.data.value = this.data.value - this.value.value;
    await this.loadingService.presentLoading();
    await this.calculateService.cashGeneral(this.data);
    await this.loadingService.presentToast(mensages.consignar);
    await this.loadingService.dismiss();
    await this.cancelModal();
  }
}
