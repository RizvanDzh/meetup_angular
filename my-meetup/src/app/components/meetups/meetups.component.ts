import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  filter,
} from 'rxjs';
import { IMeetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetupsComponent implements OnInit, OnDestroy {
  public meetups!: IMeetup[];
  public search = new FormControl<string | null>('');
  public destroy = new Subject<void>();
  public filteredMeetups: IMeetup[] = [];
  public link: string = '';

  constructor(
    private meetupService: MeetupsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {
    this.link = router.url;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.meetupService.getMeetups().subscribe((data: IMeetup[]) => {
        this.meetups = this.filterMeetups(data);
        this.filteredMeetups = [...this.meetups];
        this.cdr.markForCheck();
      });
    }, 1000);

    this.search.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300), takeUntil(this.destroy))
      .subscribe((data: string | null) => {
        this.filteredMeetups = this.filterMeetups(
          this.meetups.filter(
            (meetup) =>
              meetup.description.toLowerCase().includes(data!.toLowerCase()) ||
              meetup.owner.fio
                .toLocaleLowerCase()
                .includes(data!.toLowerCase()) ||
              meetup.name.toLowerCase().includes(data!.toLowerCase())
          )
        );

        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private filterMeetups(meetups: IMeetup[]) {
    if (this.link === '/myMeetups') {
      return meetups.filter((i) => i.createdBy === this.authService.user.id);
    }
    return meetups;
  }
}
