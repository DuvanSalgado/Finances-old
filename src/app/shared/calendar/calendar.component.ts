import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  dateValue = '';
  constructor() { }

  ngOnInit() { }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
}
