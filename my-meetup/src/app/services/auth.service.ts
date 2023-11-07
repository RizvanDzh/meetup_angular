import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email?: string | null, password?: string | null) {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['meetups']);
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  public get user(): any {
    const token = this.token;
    if (token) {
      const userJwt = this.parseJwt(token);
      return userJwt;
    } else {
      return null;
    }
  }
}
