import { CalendarEvent } from './CalendarEvent';
import * as dateFns from 'date-fns';

  export const validateEvents = (events: CalendarEvent[]) => {
    const warn = (...args: any[]) => console.warn('angular-calendar', ...args);
    return validateEventsWithoutLog(events, warn);
  };

  export function isInside(outer: ClientRect, inner: ClientRect): boolean {
    return (
      outer.left <= inner.left &&
      inner.left <= outer.right &&
      outer.left <= inner.right &&
      inner.right <= outer.right &&
      outer.top <= inner.top &&
      inner.top <= outer.bottom &&
      outer.top <= inner.bottom &&
      inner.bottom <= outer.bottom
    );
  }
  export function validateEventsWithoutLog(
    events: CalendarEvent[],
    log: (...args: any[]) => void
  ): boolean {
    let isValid = true;

    function isError(msg: any, event: CalendarEvent): void {
      log(msg, event);
      isValid = false;
    }

    if (!Array.isArray(events)) {
      log('Events must be an array', events);
      return false;
    }

    events.forEach(event => {
      if (!event.start) {
        isError('Event is missing the `start` property', event);
      } else if (!dateFns.isDate(event.start)) {
        isError('Event `start` property should be a javascript date object. Do `new Date(event.start)` to fix it.', event);
      }

      if (event.end) {
        if (!dateFns.isDate(event.end)) {
          isError('Event `end` property should be a javascript date object. Do `new Date(event.end)` to fix it.', event);
        }
        if (event.start > event.end) {
          isError('Event `start` property occurs after the `end`', event);
        }
      }
    });

    return isValid;
}
