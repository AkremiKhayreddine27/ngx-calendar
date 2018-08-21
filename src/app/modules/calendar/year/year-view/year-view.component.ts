import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import * as dateFns from 'date-fns';
import { Calendar } from '../../utils/Calendar';
import { CalendarEvent } from '../../utils/CalendarEvent';
import { NgbDatepickerConfig, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import { getEventsInPeriod, isEventIsPeriod } from '../../utils/common';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'calendar-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.scss']
})
export class YearViewComponent implements OnInit, OnChanges {


  /**
  * The current view date
  */
  @Input() viewDate: Date;

  /**
  * An array of calendars to display on view.
  */
  @Input() calendars: Calendar[] = [];

  /**
  * An observable that when emitted on will re-render the current view
  */
  @Input() refresh: Subject<any>;

  /**
  * @hidden
  */
  refreshSubscription: Subscription;

  @ViewChild(NgbDatepicker) ngbDatepicker: NgbDatepicker;


  displayMonths = 12;
  navigation = 'none';
  showWeekNumbers = false;

  /**
  * Called when the event title is clicked
  */
  @Output()
  dayClicked: EventEmitter<{ day: Date, events: CalendarEvent[] }> = new EventEmitter<{
    day: Date;
    events: CalendarEvent[];
  }>();

  startDate;

  constructor(private config: NgbDatepickerConfig) {
    this.startDate = { year: new Date().getFullYear(), month: 1 };
  }

  ngOnInit() {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        const toDay = { year: this.viewDate.getFullYear(), month: dateFns.getMonth(this.viewDate) + 1, day: this.viewDate.getDate() };
        this.startDate = { year: this.viewDate.getFullYear(), month: 1 };
        this.ngbDatepicker.navigateTo(toDay);
      });
    }
  }

  /**
  * @hidden
  */
  ngOnChanges(changes: any): void {
    if (changes.viewDate) {
      const toDay = { year: this.viewDate.getFullYear(), month: dateFns.getMonth(this.viewDate) + 1, day: this.viewDate.getDate() };
      this.startDate = { year: this.viewDate.getFullYear(), month: 1 };
      this.ngbDatepicker.navigateTo(toDay);
    }
  }

  daySelected(date) {
    const events = [];
    const day = new Date(date.year, date.month - 1, date.day);
    this.calendars.map(calendar => {
      calendar.events.map(event => {
        if (isEventIsPeriod({ event, periodStart: dateFns.startOfDay(day), periodEnd: dateFns.endOfDay(day) })) {
          events.push(event);
        }
      });
    });
    this.dayClicked.emit({ day: day, events: events });
  }

  isToday(date) {
    const day = new Date(date.year, date.month - 1, date.day);
    const currentDay = new Date();
    if (day.getDate() === currentDay.getDate() &&
      day.getFullYear() === currentDay.getFullYear() &&
      day.getMonth() === currentDay.getMonth()) {
      return true;
    } else {
      return false;
    }
  }

  isReserved(date) {
    const day = new Date(date.year, date.month - 1, date.day);
    let isReserved = false;
    this.calendars.map(calendar => {
      calendar.events.map(event => {
        if (isEventIsPeriod({ event, periodStart: dateFns.startOfDay(day), periodEnd: dateFns.endOfDay(day) })) {
          isReserved = true;
        }
      });
    });
    return isReserved;
  }

  getColor(date) {
    const day = new Date(date.year, date.month - 1, date.day);
    let color = 'transparent';
    this.calendars.map(calendar => {
      calendar.events.map(event => {
        if (isEventIsPeriod({ event, periodStart: dateFns.startOfDay(day), periodEnd: dateFns.endOfDay(day) })) {
          color = calendar.color;
        }
      });
    });
    return color;
  }

}
