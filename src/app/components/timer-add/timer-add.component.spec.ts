import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAddComponent } from './timer-add.component';

describe('TimerAddComponent', () => {
  let component: TimerAddComponent;
  let fixture: ComponentFixture<TimerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
