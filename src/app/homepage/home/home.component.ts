import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { AboutComponent } from '../about/about.component';
import { VisionComponent } from '../vision/vision.component';
import { OutputsComponent } from '../outputs/outputs.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { FeatureComponent } from '../feature/feature.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    AboutComponent,
    FeatureComponent,
    OutputsComponent,
    VisionComponent,
    FooterComponent,
  ],
})
export class HomeComponent implements OnInit {
  title = 'DEPANO AI';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

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
      this.userService.getMyUserDetails().subscribe({
        next: (user: User) => {
          this.userService.userDetails.next(user);
          this.router.navigate(['gender']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.status === 'UNAUTHORIZED') {
            this.router.navigate(['login']);
          } else if (err.error?.status === 'SERVICE_UNAVAILABLE') {
            // load error screen
          }
        },
      });
    }
  }

  signup() {
    this.router.navigate(['signup']);
  }

  login() {
    this.router.navigate(['login']);
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
