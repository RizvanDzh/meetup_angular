import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MeetupFormComponent } from '../meetup-form/meetup-form.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private dialog: MatDialog, private authServ: AuthService) {}

  public openDialog() {
    const dialogRef = this.dialog.open(MeetupFormComponent, {
      height: '95vh',
      width: '1400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public get isAuth(): string | null {
    return this.authServ.token;
  }
}
