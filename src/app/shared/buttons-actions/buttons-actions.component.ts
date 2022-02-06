import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-buttons-actions',
  templateUrl: './buttons-actions.component.html',
  styleUrls: ['./buttons-actions.component.scss'],
})
export class ButtonsActionsComponent {

  @Input() isCreate = true;
  @Output() createEventEmit = new EventEmitter();

  update(): void {
    this.createEventEmit.emit(false);
  }

  create(): void {
    this.createEventEmit.emit(true);
  }

}
