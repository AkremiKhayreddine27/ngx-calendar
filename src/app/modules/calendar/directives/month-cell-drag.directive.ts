import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CalendarEvent } from '../utils/CalendarEvent';
import * as dateFns from 'date-fns';

@Directive({
  selector: '[appMonthCellDrag]'
})
export class MonthCellDragDirective {

  @Input() day: any;

  @Input() event: CalendarEvent;

  @Output()
  newEvent: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  @Output()
  updateEvent: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  constructor() { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.event = {
      title: 'No title',
      start: dateFns.startOfDay(this.day.date),
      end: dateFns.endOfDay(this.day.date),
      color: 'red',
      allDay: true,
      isReservation: false
    };
    event.preventDefault();
    this.newEvent.emit({event: this.event});
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    if (this.event) {
      if (this.day.date <= this.event.start) {
        this.event.start = dateFns.startOfDay(this.day.date);
      }else {
        this.event.end = dateFns.endOfDay(this.day.date);
      }
      this.updateEvent.emit({event: this.event});
    }
  }

}
