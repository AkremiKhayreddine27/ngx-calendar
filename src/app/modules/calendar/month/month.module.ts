import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewComponent } from './month-view/month-view.component';
import { MonthCellComponent } from './month-cell/month-cell.component';
import { MonthViewHeaderComponent } from './month-view-header/month-view-header.component';
import { OpenDayEventsComponent } from './open-day-events/open-day-events.component';

import { DragDropDirectiveModule} from 'angular4-drag-drop';

import { MonthCellDragDirective } from '../directives/month-cell-drag.directive';

@NgModule({
  imports: [
    CommonModule,
    DragDropDirectiveModule
  ],
  declarations: [
    MonthViewComponent,
    MonthCellComponent,
    MonthViewHeaderComponent,
    OpenDayEventsComponent,
    MonthCellDragDirective
  ],
  exports: [
    MonthViewComponent,
    MonthCellDragDirective
  ]
})
export class MonthModule { }

