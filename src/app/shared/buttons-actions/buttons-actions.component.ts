import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-actions',
  templateUrl: './buttons-actions.component.html',
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
    this.createEventEmit.emit();
  }

  cancel(): void {
    this.cancelEventEmit.emit();
  }

}
