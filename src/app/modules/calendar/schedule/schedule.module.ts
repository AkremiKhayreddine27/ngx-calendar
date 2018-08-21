import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ScheduleViewComponent],
  exports: [ScheduleViewComponent]
})
export class ScheduleModule { }
