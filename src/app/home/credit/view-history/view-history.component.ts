import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss'],
})
export class ViewHistoryComponent {

  @Input() listHistory = null;
}
