import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IMeetup } from 'src/app/entities/meetup';
import { MatButtonModule } from '@angular/material/button';
import { MeetupFormComponent } from '../meetup-form/meetup-form.component';
import { MeetupsService } from 'src/app/services/meetups.service';
import { AuthService } from 'src/app/services/auth.service';
import { OpenedCardsService } from 'src/app/services/opened-cards.service';

@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetupCardComponent implements OnInit {
  public userId: number = 0;
  public isGoing: boolean = false;

  constructor(
    private dialog: MatDialog,
    private meetupServ: MeetupsService,
    public auth: AuthService,
    private cdr: ChangeDetectorRef,
    public openedCard: OpenedCardsService
  ) {
    this.userId = auth.user.id;
  }

  ngOnInit(): void {
    this.checkVisitor();
  }

  @Input() meetup!: IMeetup;

  public openDialog(meetup: IMeetup) {
    const dialogRef = this.dialog.open(MeetupFormComponent, {
      height: '95vh',
      width: '1400px',
      data: { meetupItem: meetup },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public addVisitor() {
    this.meetupServ
      .followMeetups(this.meetup.id, this.auth.user.id)
      .subscribe((data) => {
        this.meetup = data;
        this.checkVisitor();
        this.cdr.markForCheck();
      });
  }

  public deleteVisitor() {
    this.meetupServ
      .unfollowMeetups(this.meetup.id, this.auth.user.id)
      .subscribe((data) => {
        this.meetup = data;
        this.checkVisitor();
        this.cdr.markForCheck();
      });
  }

  private checkVisitor() {
    this.isGoing =
      this.meetup.users.filter((user) => user.id === this.userId).length > 0;
  }

  public showMore(meetup: IMeetup): void {
    this.openedCard.addOpenedCard(meetup);
  }

  public showLess(meetup: IMeetup): void {
    this.openedCard.deleteOpenedCard(meetup);
  }
}
