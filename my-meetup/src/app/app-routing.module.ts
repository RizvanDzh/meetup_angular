import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { MeetupsComponent } from './components/meetups/meetups.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'meetups', component: MeetupsComponent, canActivate: [authGuard] },
  { path: 'myMeetups', component: MeetupsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'meetups', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'userList', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
