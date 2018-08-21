import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearViewComponent } from './year-view.component';

describe('YearViewComponent', () => {
  let component: YearViewComponent;
  let fixture: ComponentFixture<YearViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
