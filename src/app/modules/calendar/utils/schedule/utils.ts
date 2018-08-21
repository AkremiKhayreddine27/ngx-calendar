import * as dateFns from 'date-fns';
import { getEventsInPeriod } from '../common';
import { Calendar } from '../Calendar';
import { CalendarEvent } from '../CalendarEvent';

const HOURS_IN_DAY = 24;

export function getScheduleView({
    events = [],
    calendars = [],
    viewDate
}) {
    let previousDate = viewDate;
    const days = [];
    for (let day = 0; day < 7; day ++) {
      mergeEvents(events, calendars).then((evs: CalendarEvent[]) => {
        const startDay = dateFns.startOfDay(previousDate);
        const endDay = dateFns.endOfDay(previousDate);
        const eventsInDay = getEventsInPeriod({
            events: evs,
            periodStart: startDay,
            periodEnd: endDay
        });
        if (eventsInDay.length > 0) {
            days.push({
                date: previousDate,
                events: eventsInDay
            });
        }
        previousDate = dateFns.startOfDay(dateFns.addHours(previousDate, HOURS_IN_DAY + 1));
      });
    }
    return days;
}

function mergeEvents(events: CalendarEvent[], calendars: Calendar[]) {
    return new Promise((resolve, reject) => {
      let i = 1;
      let evs = events;
      if (calendars.length > 0) {
        for (const calendar of calendars) {
          evs = evs.concat(calendar.events);
          if (i === calendars.length) {
            resolve(evs);
          } else {
            i++;
          }
        }
      } else {
        resolve(evs);
      }
    });
  }
