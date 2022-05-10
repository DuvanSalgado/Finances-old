import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html'
})
export class SegmentComponent {

  @Output() segmentEventEmit = new EventEmitter<string>();

  public segmentChanged(event: any): void {
    this.segmentEventEmit.emit(event.detail.value);
  }
}
