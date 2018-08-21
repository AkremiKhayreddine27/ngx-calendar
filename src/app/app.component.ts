import { Component, OnInit, HostListener } from '@angular/core';
import * as dateFns from 'date-fns';

import { CalendarEvent } from './modules/calendar/utils/CalendarEvent';
import { Calendar } from './modules/calendar/utils/Calendar';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  viewDate = new Date();
  toDay = {year: this.viewDate.getFullYear(), month: dateFns.getMonth(this.viewDate) + 1, day: this.viewDate.getDate()};
  view = 'month';
  refresh: Subject<any> = new Subject();
  local: Calendar = {
    id: 1,
    name: 'Local Calendar',
    url: '',
    color: '#f4511e',
    isLocal: true,
    display: true,
    events: [
      {
        id: 1,
        title: 'event 8',
        start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 1),
        end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 22), 1),
        allDay: false,
        location: {
          latitude: 36.38231964015791,
          longitude: 10.537776947021484,
          address: 'N1, Yasmine Hammamet, Tunisia'
        },
        draggable: true,
        isReservation: false
      },
      {
        id: 2,
        title: 'event 4',
        start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 2),
        end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 6),
        allDay: true,
        location: {
          latitude: 36.383148839368054,
          longitude: 10.532970428466797,
          address: 'Highway A1, Yasmine Hammamet, Tunisia'
        },
        draggable: true,
        isReservation: false
      }
    ]
  };

  google: Calendar = {
    id: 2,
    name: 'Google Calendar',
    url: '',
    color: '#000000',
    isLocal: false,
    display: true,
    events: [
      {
        id: 3,
        title: 'event 2',
        start: dateFns.setHours(dateFns.setMinutes(new Date(), 0), 22),
        end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 2), 1),
        allDay: false,
        location: {
          latitude: 36.37513287663765,
          longitude: 10.534601211547852,
          address: 'RN1, Yasmine Hammamet, Tunisia'
        },
        draggable: false,
        isReservation: false
      },
      {
        id: 4,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 2),
        end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 11),
        allDay: true,
        location: {
          latitude: 36.37070992286047,
          longitude: 10.526790618896484,
          address: 'RN1, Yasmine Hammamet, Tunisia'
        },
        draggable: false,
        isReservation: true
      }
    ]
  };

  originalEvents: CalendarEvent[] = [];

  events: CalendarEvent[] = [
    {
      title: 'Lorem ipsum dolor sit amet',
      start: dateFns.setHours(dateFns.setMinutes(new Date(), 0), 22),
      end: dateFns.setHours(dateFns.setMinutes(new Date(), 0), 23),
      allDay: false,
      isReservation: false,
      color: 'red',
      location: {
        latitude: 36.361586786517776,
        longitude: 10.527820587158203,
        address: 'Unnamed Road, Yasmine Hammamet, Tunisia'
      }
    },
    {
      title: 'event 5',
      start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 2),
      end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 4),
      allDay: true,
      isReservation: false,
      color: 'green',
      location: {
        latitude: 36.36960414512363,
        longitude: 10.52438735961914,
        address: 'RN1, Yasmine Hammamet, Tunisia'
      }
    }
  ];

  calendars: Calendar[] = [
    this.local,
    this.google
  ];

  originalCalendar: Calendar[] = [];

  canAddEvent = true;

  ngOnInit() {
    this.calendars.map(calendar => {
      this.originalCalendar.push(calendar);
      calendar.events.map(event => {
        event.color = calendar.color,
        this.originalEvents.push(event);
        return event;
      });
    });
    this.setupEvents();
  }

  eventClicked(event: CalendarEvent) {
    alert(event.id);
  }

  filter(calendars) {
    this.calendars = calendars;
  }

  newEvent(event: CalendarEvent, isEventClicked) {
    if (this.canAddEvent && !isEventClicked) {
      console.log('New Event');
      event.draggable = true;
      event.id = Math.random();
      this.local.events.push(event);
      this.refresh.next();
    }
  }

  editEvent(event, end, isEventClicked) {
    if (this.canAddEvent && !isEventClicked) {
      this.calendars.map(calendar => {
        calendar.events.map(e => {
          if (e === event) {
            e.end = event.end;
            this.refresh.next();
          }
        });
      });
    }
    if (end && !isEventClicked) {
      alert('Create event');
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }): void {
    this.calendars.map(calendar => {
      calendar.events.map(e => {
        if (e.id === event.id) {
          e.start = newStart;
          e.end = newEnd;
          this.refresh.next();
        }
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  detectWindowResize($event) {
    this.setupEvents();
  }

  setupEvents() {
    if (window.innerWidth < 768) {
      this.calendars.map(calendar => {
        calendar.events.map(event => {
          event.draggable = false;
        });
      });
      this.canAddEvent = false;
    }else {
      this.canAddEvent = true;
    }
  }

  yearDayClicked(day, events) {
    console.log(day);
    console.log(events);
  }

  daySelected($event) {
    const day = dateFns.parse($event.year + '-' + $event.month + '-' + $event.day);
    this.view = 'day';
    this.viewDate = day;
  }

  isToday(date) {
    const day = new Date(date.year, date.month - 1, date.day);
    const currentDay = new Date();
    if ( day.getDate() === currentDay.getDate() &&
        day.getFullYear() === currentDay.getFullYear() && day.getMonth() === currentDay.getMonth()) {
      return true;
    }else {
      return false;
    }
  }
}
