import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { FormInvestmetsCtrl } from './model/formEnumCtrl';
import { IInvestments } from './model/model';
import { InvestmentsService } from './services/investments.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss'],
})
export class InvestmentsComponent implements OnInit {

  public listData: Array<IInvestments> = [];
  private formGroup: FormGroup;
  private formCtrl = FormInvestmetsCtrl;

  constructor(
    private modalCtrl: ModalController,
    private formBuild: FormBuilder,
    private investmentService: InvestmentsService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getData();
  }

  public async openModalCreate(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreateModalComponent,
      backdropDismiss: false,
      cssClass: 'investments-create',
      componentProps: { formGroup: this.formGroup }
    });
    modal.present();
    await modal.onWillDismiss();
    if (this.formGroup.valid) { this.saveData(); }
  }

  private getData(): void {
    this.investmentService.getAll().subscribe(data => {
      this.listData = data;
    });
  }

  private saveData(): void {
    this.investmentService.create(this.formGroup.value);
  }

  private initializeForm(): void {
    this.formGroup = this.formBuild.group({
      [this.formCtrl.value]: [null, Validators.required],
      [this.formCtrl.date]: [new Date()]
    });
  }
}
