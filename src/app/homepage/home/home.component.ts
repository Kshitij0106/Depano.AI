import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'DEPANO AI';
  constructor(private router: Router, private authService: AuthService) {}

  getStarted() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['gender']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
