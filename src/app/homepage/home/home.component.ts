import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title = 'DEPANO AI';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.disableBackButton();
  }

  /**
   * Initiates the user flow by checking the login status.
   * If the user is logged in, they are redirected to the gender selection page;
   * otherwise, they are redirected to the login page.
   */
  getStarted() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['gender']);
    } else {
      this.router.navigate(['login']);
    }
  }

  disableBackButton() {
    // Add an initial dummy state
    history.pushState(null, '', window.location.href);

    // Listen for back and forward buttons (popstate event)
    window.addEventListener('popstate', (event) => {
      // Replace the state to prevent the back button from navigating
      history.pushState(null, '', window.location.href);
    });
  }
}
