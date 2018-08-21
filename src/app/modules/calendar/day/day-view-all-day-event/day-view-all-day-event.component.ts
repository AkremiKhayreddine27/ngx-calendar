import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent } from '../../utils/CalendarEvent';

@Component({
  selector: 'calendar-day-view-all-day-event',
  templateUrl: './day-view-all-day-event.component.html',
  styleUrls: ['./day-view-all-day-event.component.css']
})
export class DayViewAllDayEventComponent {

  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

}
