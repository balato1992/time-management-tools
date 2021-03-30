import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationContainerGroupComponent } from './animation-container-group.component';

describe('AnimationContainerGroupComponent', () => {
  let component: AnimationContainerGroupComponent;
  let fixture: ComponentFixture<AnimationContainerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationContainerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationContainerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
