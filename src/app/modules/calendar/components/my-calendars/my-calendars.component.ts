import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Calendar } from '../../utils/Calendar';
import { CalendarEvent } from '../../utils/CalendarEvent';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Component as IcsComponent, Property } from 'immutable-ics';
import { saveAs } from 'file-saver/FileSaver';
import ICAL from 'ical.js';
import * as dateFns from 'date-fns';

const colors = [
  '#f4511e',
  '#0b8043',
  '#039be5',
  '#d50000',
  '#8e24aa',
  '#010101'
];

@Component({
  selector: 'calendar-my-calendars',
  templateUrl: './my-calendars.component.html',
  styleUrls: ['./my-calendars.component.scss']
})
export class MyCalendarsComponent implements OnInit, OnChanges {

  @Input()
  events: CalendarEvent[];

  @Input()
  calendars: Calendar[];

  /**
  * An observable that when emitted on will re-render the current view
  */
  @Input() refresh: Subject<any>;

  public colors = colors;

  public form: FormGroup;

  @Output()
  newImportedEvents: EventEmitter<{ events: any[], calendarName: string }> = new EventEmitter<{
    events: any[];
    calendarName: string
  }>();

  @Output()
  filtredEvents: EventEmitter<{ calendars: any[] }> = new EventEmitter<{
    calendars: any[]
  }>();

  @Output()
  newCalendar: EventEmitter<{}> = new EventEmitter<{}>();

  /**
  * @hidden
  */
  refreshSubscription: Subscription;

  icsEvents =  [];


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {

   }

  ngOnInit() {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshForm();
        this.refreshEvents();
        this.cdr.markForCheck();
      });
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.calendars || changes.events) {
      this.refreshForm();
      this.refreshEvents();
      /*
      const activeCalendars = this.form.get('activeCalendars') as FormArray;
      activeCalendars.push(new FormControl(true));
      */
    }
  }


  refreshForm() {
    this.form = this.formBuilder.group({
      activeCalendars: this.buildCalendars(),
      color: ['#8e24aa'],
    });
  }

  refreshEvents() {
    this.icsEvents = this.events.map(event => {
      return new IcsComponent({
        name: 'VEVENT',
        properties: [
          new Property({
            name: 'DTSTART',
            value: event.start
          }),
          new Property({
            name: 'DTEND',
            value: event.end
          }),
          new Property({
            name: 'SUMMARY',
            value: event.title
          }),
        ]
      });
    });
  }

  buildCalendars() {
    const arr = this.calendars.map(calendar => {
      return this.formBuilder.control(true);
    });
    return this.formBuilder.array(arr);
  }


  get activeCalendars(): FormArray {
    return this.form.get('activeCalendars') as FormArray;
  }

  setColor(color, calendar: Calendar) {
    calendar.color = color;
    for (const event of this.events) {
      if (event.calendar.name === calendar.name) {
        event.calendar.color = calendar.color;
      }
    }
  }


  filter ($event: any, source: string) {
    const activeCalendars = this.form.get('activeCalendars') as FormArray;
    const events: CalendarEvent[] = [];
    const calendars: Calendar[] = [];
    activeCalendars.controls.forEach((calendar, index) => {
      this.calendars.map((cal: Calendar) => {
        if (calendar.value && this.calendars[index].id === cal.id) {
          calendars.push(cal);
        }
      });
    });
    this.filtredEvents.emit({calendars});
  }


  import (event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsText(file);
      reader.onload = () => {
        const jcalData = ICAL.parse(reader.result);
        const comp = new ICAL.Component(jcalData);
        let res = 'No Name';
        if (comp.getFirstProperty('x-wr-calname')) {
          res = comp.getFirstProperty('x-wr-calname').getFirstValue();
        }
        const vevents = comp.getAllSubcomponents('vevent');
        const data = vevents.map(vevent => {
          const cevent = new ICAL.Event(vevent);
          return {
            title: cevent.summary,
            start: dateFns.parse(cevent.startDate),
            end: dateFns.parse(cevent.endDate),
            description: cevent.description,
            location: cevent.location
          };
        });
        this.newImportedEvents.emit({events: data, calendarName: res});
      };
    }
  }

  export() {
    const calendar = new IcsComponent({
      name: 'VCALENDAR',
      properties: [
        new Property({ name: 'VERSION', value: 2 })
      ],
      components: this.icsEvents
    });
    const blob = new Blob([calendar.toString()], { type: 'text/plain' });
    saveAs(blob, 'calendar.ics');
  }

}
