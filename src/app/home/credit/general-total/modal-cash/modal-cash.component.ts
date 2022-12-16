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
  styleUrls: ['./modal-cash.component.scss'],
  providers: [LoadingService]
})
export class ModalCashComponent {

  @Input() cashGeneral: IcashGeneral;

  public value = new FormControl(null, Validators.required);

  constructor(
    private modalController: ModalController,
    private calculateService: CalculateService,
    private loadingService: LoadingService
  ) { }

  public cancelModal(): void {
    this.modalController.dismiss(true);
  }

  public addValue(): void {
    if (this.cashGeneral) this.cashGeneral.value += (+this.value.value);
    this.onSaveChange();
  }

  public removeValue(): void {
    if (this.cashGeneral) this.cashGeneral.value -= (+this.value.value);
    this.onSaveChange();
  }

  public async onSaveChange(): Promise<void> {
    await this.loadingService.presentLoading();
    await this.calculateService.cashGeneral(this.cashGeneral);
    this.loadingService.presentToast(mensages.consignar);
    this.loadingService.dismiss();
    this.cancelModal();
  }
}
