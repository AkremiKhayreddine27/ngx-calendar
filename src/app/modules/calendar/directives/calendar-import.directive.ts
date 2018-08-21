import {
    Directive,
    HostListener,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';
  import * as dateFns from 'date-fns';
  import ICAL from 'ical.js';

  @Directive({
    selector: '[appCalendarImport]'
  })
  export class CalendarImportDirective {

    @Output()
    newImportedEvents: EventEmitter<{ events: any[], calendarName: string }> = new EventEmitter<{
      events: any[];
      calendarName: string
    }>();

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

    /**
     * @hidden
     */
    @HostListener('change', ['$event'])
    onChange(event): void {
      this.import(event);
    }
  }
