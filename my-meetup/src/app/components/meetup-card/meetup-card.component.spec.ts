import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupCardComponent } from './meetup-card.component';

describe('MeetupCardComponent', () => {
  let component: MeetupCardComponent;
  let fixture: ComponentFixture<MeetupCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupCardComponent]
    });
    fixture = TestBed.createComponent(MeetupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
