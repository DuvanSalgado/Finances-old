import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html'
})
export class CurrencyInputComponent {

  private static backspaceKey = 'Backspace';
  private static backspaceInputType = 'deleteContentBackward';
  @ViewChild('dummyFacade', { static: false }) private dummyFacade: IonInput;
  public value = '';

  changeInput(event: any): void {
    this.clearInput();
    if (event.detail.data && !isNaN(event.detail.data)) {
      this.addDigit(event.detail.data);
    } else if (event.detail.inputType === CurrencyInputComponent.backspaceInputType) {
      // this handles numpad input for delete/backspace
      this.delDigit();
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    // this handles keyboard input for backspace
    if (event.key === CurrencyInputComponent.backspaceKey) {
      this.delDigit();
    }
  }


  private addDigit(key: string) {
    this.value = this.value + key;
    // this.amountEntered.emit(+this.amount);
  }

  private delDigit() {
    this.value = this.value.substring(0, this.value.length - 1);
    //this.amountEntered.emit(+this.amount);
  }

  private clearInput() {
    this.dummyFacade.value = '.0';
  }



}
