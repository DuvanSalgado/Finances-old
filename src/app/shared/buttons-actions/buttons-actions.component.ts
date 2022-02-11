import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-buttons-actions',
  templateUrl: './buttons-actions.component.html',
  styleUrls: ['./buttons-actions.component.scss'],
})
export class ButtonsActionsComponent {

  @Input() isCreate = true;
  @Input() disabled = false;
  @Output() createEventEmit = new EventEmitter<boolean>();
  @Output() cancelEventEmit = new EventEmitter<boolean>();

  update(): void {
    this.createEventEmit.emit(false);
  }

  create(): void {
    this.createEventEmit.emit(true);
  }

  cancel(): void {
    this.cancelEventEmit.emit();
  }

}
