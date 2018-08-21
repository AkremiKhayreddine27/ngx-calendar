import { EventColor } from './EventColor';
import { EventAction } from './EventAction';
import { Calendar } from './Calendar';
import { Location } from './Location';

export interface CalendarEvent<MetaType = any> {
    id?: number;
    start: Date;
    end: Date;
    title: string;
    location?: Location;
    description?: string;
    calendar?: Calendar;
    color?: string;
    isReservation: boolean;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
      beforeStart?: boolean;
      afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
}
