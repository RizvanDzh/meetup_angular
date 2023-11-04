import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupFormComponent } from './components/meetup-form/meetup-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { AboutComponent } from './components/about/about.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    MeetupCardComponent,
    MeetupFormComponent,
    AuthComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
