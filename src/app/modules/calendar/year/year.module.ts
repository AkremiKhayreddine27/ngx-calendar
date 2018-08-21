import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearViewComponent } from './year-view/year-view.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbDatepickerModule
  ],
  declarations: [YearViewComponent],
  exports: [YearViewComponent]
})
export class YearModule { }
