import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCalendarsComponent } from './my-calendars.component';

describe('MyCalendarsComponent', () => {
  let component: MyCalendarsComponent;
  let fixture: ComponentFixture<MyCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
