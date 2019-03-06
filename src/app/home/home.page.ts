import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private nav: Router,
    public authData: AuthService
  ) {
    this.authData = authData;
    }

  logOut() {
    this.authData.logoutUser().then(() => {
      this.nav.navigate(['/login']);
    });
  }

}
