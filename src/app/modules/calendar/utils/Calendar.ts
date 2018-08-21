import { CalendarEvent } from './CalendarEvent';

export interface Calendar {
    id: number;
    name: string;
    url: string;
    isLocal: boolean;
    color: string;
    display: boolean;
    events?: CalendarEvent[];
}
