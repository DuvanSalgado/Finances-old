import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@app/core/services/loading.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MotoModalAddComponent } from './moto-modal-add/moto-modal-add.component';
import { FormMotoCtrl, IMoto } from './shared/models/moto-Form';
import { MotoService } from './shared/services/moto.service';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.scss'],
})
export class MotoComponent implements OnInit, OnDestroy {

  public data: IMoto;

  private formGroup: FormGroup;
  private date: Date = new Date();
  private dateProx: Date = new Date();;
  private formCtrl = FormMotoCtrl;
  private referencia = 2000;
  private subscription: Subscription;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private motoService: MotoService,
    private loadingService: LoadingService
    ) { }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  ngOnInit(): void {
    this.initilizeForm();
    this.getData(this.date.getMonth());
    this.loadingService.presentLoading();
  }

  public valueChanges(month: number): void {
    this.getData(month);
  }

  public async openModalCreate(): Promise<void> {
    const modal = await this.modalController.create({
      component: MotoModalAddComponent,
      cssClass: 'cambio-aceite-modal',
      backdropDismiss: false,
      componentProps: { formGroup: this.formGroup }
    });
    modal.present();
    await (await modal.onWillDismiss()).data;

    if (this.formGroup.valid) { this.saveData(); }
    else { this.resetForm(); }
  }

  private initilizeForm(): void {
    this.formGroup = this.formBuilder.group({
      [this.formCtrl.kilometraje]: [null, [Validators.required, Validators.min(1)]],
      [this.formCtrl.kilometrajeProx]: [null],
      [this.formCtrl.date]: [this.date],
      [this.formCtrl.month]: [this.date.getMonth()],
      [this.formCtrl.dateProx]: [this.dateProx.setMonth(this.date.getMonth() + 1)]
    });
  }

  private getData(month: number): void {
    this.subscription = this.motoService.getAll(month).subscribe(data => {
      this.data = data[data.length - 1];
      this.loadingService.dismiss();
    });

    this.subscription.add(this.motoService.getReferencia()
      .subscribe(ref => this.referencia = +ref[0].value));
  }

  private resetForm(): void {
    this.formGroup.controls[this.formCtrl.kilometraje].reset();
    this.formGroup.controls[this.formCtrl.kilometrajeProx].reset();
  }

  private saveData(): void {
    const km = +this.formGroup.get(this.formCtrl.kilometraje).value;
    const value = this.referencia + km;
    this.formGroup.controls[this.formCtrl.kilometrajeProx].patchValue(value);
    this.motoService.create(this.formGroup.value);
    this.resetForm();
  }

}
