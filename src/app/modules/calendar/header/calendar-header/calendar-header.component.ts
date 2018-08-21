import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'fr';

  @Input() events: any[];

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  views: any[] = [
    { text: 'Month', value: 'month' },
    { text: 'Week', value: 'week' },
    { text: 'Day', value: 'day' },
    { text: 'Schedule', value: 'schedule' },
    { text: 'Year', value: 'year' },
  ];

  constructor() { }

  ngOnInit() {
  }


}
