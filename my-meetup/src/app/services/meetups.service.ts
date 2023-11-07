import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeetup } from '../entities/meetup';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MeetupsService {
  subject = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  public getMeetups(): Observable<IMeetup[]> {
    return this.http.get<IMeetup[]>(`${environment.backendOrigin}/meetup`);
  }

  public createMeetup(meetup: any) {
    return this.http.post<any>(`${environment.backendOrigin}/meetup`, meetup);
  }

  public editMeetup(meetup: IMeetup, newMeetup: any) {
    return this.http.put<any>(
      `${environment.backendOrigin}/meetup/${meetup.id}`,
      newMeetup
    );
  }

  public deleteMeetup(meetup: any) {
    return this.http.delete<any>(
      `${environment.backendOrigin}/meetup/${meetup.id}`
    );
  }

  public followMeetups(meetupId: number, userId: number) {
    return this.http.put<any>(`${environment.backendOrigin}/meetup`, {
      idMeetup: meetupId,
      idUser: userId,
    });
  }

  public unfollowMeetups(meetupId: number, userId: number) {
    console.log(2);
    return this.http.delete<any>(`${environment.backendOrigin}/meetup`, {
      body: {
        idMeetup: meetupId,
        idUser: userId,
      },
    });
  }
}
