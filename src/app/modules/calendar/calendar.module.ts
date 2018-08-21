import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DraggableHelper } from 'angular-draggable-droppable';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DayModule } from './day/day.module';
import { MonthModule } from './month/month.module';
import { WeekModule } from './week/week.module';
import { ScheduleModule } from './schedule/schedule.module';
import { YearModule } from './year/year.module';
import { HeaderModule } from './header/header.module';

import { CalendarImportDirective } from './directives/calendar-import.directive';
import { CalendarExportDirective } from './directives/calendar-export.directive';

import { CalendarUtilsService } from './utils/calendar-utils.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DayModule,
    MonthModule,
    WeekModule,
    ScheduleModule,
    YearModule,
    HeaderModule,
    NgbModule.forRoot()
  ],
  exports: [
    DayModule,
    MonthModule,
    WeekModule,
    ScheduleModule,
    YearModule,
    HeaderModule,
    CalendarImportDirective,
    CalendarExportDirective
  ],
  declarations: [
    CalendarImportDirective,
    CalendarExportDirective
  ]
})
export class CalendarModule {
  static forRoot(config = {}): ModuleWithProviders {
    return {
      ngModule: CalendarModule,
      providers: [
        DraggableHelper,
        CalendarUtilsService
      ]
    };
  }
}
