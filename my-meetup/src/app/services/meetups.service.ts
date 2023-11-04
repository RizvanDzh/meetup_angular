import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeetup } from '../entities/meetup';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MeetupsService {
  constructor(private http: HttpClient) {}

  private getMeetups(): Observable<IMeetup[]> {
    return this.http.get<IMeetup[]>(`${environment.backendOrigin}/meetup`);
  }
}
