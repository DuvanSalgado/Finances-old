import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-buttons-actions',
  templateUrl: './buttons-actions.component.html',
  styleUrls: ['./buttons-actions.component.scss'],
})
export class ButtonsActionsComponent implements OnChanges {


  @Input() isCreate = true;
  @Input() disabled = false;
  @Input() loading = false;
  @Output() createEventEmit = new EventEmitter<boolean>();
  @Output() cancelEventEmit = new EventEmitter<boolean>();
  nameButton: string;

  ngOnChanges(): void {
    this.nameButton = (this.loading) ? 'Cargando...' : 'Guardar';
  }
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
