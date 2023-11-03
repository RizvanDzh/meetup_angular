import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupFormComponent } from './meetup-form.component';

describe('MeetupFormComponent', () => {
  let component: MeetupFormComponent;
  let fixture: ComponentFixture<MeetupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupFormComponent]
    });
    fixture = TestBed.createComponent(MeetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
