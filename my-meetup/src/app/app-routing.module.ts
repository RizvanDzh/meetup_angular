import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
