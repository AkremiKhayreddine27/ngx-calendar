import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../../utils/CalendarEvent';
import { Calendar } from '../../utils/Calendar';
import { Subject } from 'rxjs/Subject';
import { CalendarUtilsService } from './../../utils/calendar-utils.service';

@Component({
  selector: 'calendar-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit, OnChanges {

  /**
  * An array of events to display on view.
  */
  @Input() events: CalendarEvent[] = [];

  /**
  * An array of events to display on view.
  */
  @Input() calendars: Calendar[] = [];

  /**
  * The current view date
  */
  @Input() viewDate: Date;

  /**
  * An observable that when emitted on will re-render the current view
  */
  @Input() refresh: Subject<any>;

  /**
  * Called when the event title is clicked
  */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  public view: any[];

  constructor(private utils: CalendarUtilsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
    if (
      changes.viewDate ||
      changes.calendars ||
      changes.events
    ) {
      this.refreshBody();
    }
  }

  private refreshBody(): void {
    this.view = this.utils.getScheduleView({
      events: this.events,
      calendars: this.calendars,
      viewDate: this.viewDate,
    });
  }

}
