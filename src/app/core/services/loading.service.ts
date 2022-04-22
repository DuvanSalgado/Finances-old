import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  private loadingModal: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  public async presentLoading(): Promise<void> {
    this.loadingModal = await this.loadingController.create({
      message: 'Cargando...',
      animated: true,
      spinner: 'bubbles',
      cssClass: 'loading-class',
    });
    return await this.loadingModal.present();
  }

  public async dismiss(): Promise<boolean> {
    return await this.loadingModal.dismiss();
  }

  public async presentToast(mensaje: string): Promise<void> {
    const toast = await this.toastController
      .create({ message: mensaje, duration: 1050, position: 'top' });
    await toast.present();
  }
}
