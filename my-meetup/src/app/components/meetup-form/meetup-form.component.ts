import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MeetupsService } from 'src/app/services/meetups.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMeetup } from 'src/app/entities/meetup';
import * as moment from 'moment';

@Component({
  selector: 'app-meetup-form',
  templateUrl: './meetup-form.component.html',
  styleUrls: ['./meetup-form.component.scss'],
})
export class MeetupFormComponent {
  public modalReactiveForm!: FormGroup<{
    name: FormControl<string | null>;
    date: FormControl<string | null>;
    time: FormControl<string | null>;
    place: FormControl<string | null>;
    shortDesc: FormControl<string | null>;
    longDesc: FormControl<string | null>;
    target: FormControl<string | null>;
    need: FormControl<string | null>;
    will: FormControl<string | null>;
    reason: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private meetups: MeetupsService,
    public dialogRef: MatDialogRef<MeetupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { meetupItem: IMeetup } | null
  ) {
    this.modalReactiveForm = this.fb.group({
      name: [`${data ? data.meetupItem.name : ''}`, [Validators.required]],
      date: [
        `${data ? moment.utc(data.meetupItem.time).format('YYYY-MM-DD') : ''}`,
        [Validators.required],
      ],
      time: [
        `${data ? moment.utc(data.meetupItem.time).format('HH:mm') : ''}`,
        [Validators.required],
      ],
      place: [`${data ? data.meetupItem.location : ''}`, [Validators.required]],
      shortDesc: ['', [Validators.required]],
      longDesc: [
        `${data ? data.meetupItem.description : ''}`,
        [Validators.required],
      ],
      target: [
        `${data ? data.meetupItem.target_audience : ''}`,
        [Validators.required],
      ],
      need: [
        `${data ? data.meetupItem.need_to_know : ''}`,
        [Validators.required],
      ],
      will: [
        `${data ? data.meetupItem.will_happen : ''}`,
        [Validators.required],
      ],
      reason: [
        `${data ? data.meetupItem.reason_to_come : ''}`,
        [Validators.required],
      ],
    });

    //this.modalReactiveForm.controls['time'].valueChanges.subscribe(console.log);
    //this.modalReactiveForm.controls['date'].valueChanges.subscribe(console.log);
  }

  saveMeetup() {
    if (this.data) {
      console.log('fdfdf');
      this.meetups
        .editMeetup(this.data.meetupItem, {
          name: this.modalReactiveForm.value.name,
          description: this.modalReactiveForm.value.longDesc,
          time: new Date(
            this.modalReactiveForm.value.date +
              ' ' +
              this.modalReactiveForm.value.time
          ).toISOString(),
          duration: 60,
          localation: this.modalReactiveForm.value.place,
          target_audience: this.modalReactiveForm.value.target,
          need_to_know: this.modalReactiveForm.value.need,
          will_heppen: this.modalReactiveForm.value.will,
          reason_to_come: this.modalReactiveForm.value.reason,
        })
        .subscribe(() => {
          this.dialogRef.close('');
        });
    } else {
      this.meetups
        .createMeetup({
          name: this.modalReactiveForm.value.name,
          description: this.modalReactiveForm.value.longDesc,
          time: new Date(
            this.modalReactiveForm.value.date +
              ' ' +
              this.modalReactiveForm.value.time
          ).toISOString(),
          duration: 60,
          localation: this.modalReactiveForm.value.place,
          target_audience: this.modalReactiveForm.value.target,
          need_to_know: this.modalReactiveForm.value.need,
          will_heppen: this.modalReactiveForm.value.will,
          reason_to_come: this.modalReactiveForm.value.reason,
        })
        .subscribe(() => {
          this.dialogRef.close('');
        });
    }
  }

  deleteForm(): void {
    if (this.data) {
      this.meetups.deleteMeetup(this.data.meetupItem).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  cancelForm(): void {
    this.dialogRef.close();
  }
}
