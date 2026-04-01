import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { VisionComponent } from '../vision/vision.component';
import { OutputsComponent } from '../outputs/outputs.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { User, UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FeatureComponent } from '../feature/feature.component';
import { LucideAngularModule } from 'lucide-angular';

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
    LucideAngularModule,
  ],
})
export class HomeComponent {
  title = 'DEPANO AI';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  /**
   * Check if user is logged in
   */
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Initiates the user flow by checking the login status.
   * If the user is logged in, they are redirected to the gender selection page;
   * otherwise, they are redirected to the login page.
   */
  getStarted() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['mode-select']);
    } else {
      this.userService.getMyUserDetails().subscribe({
        next: (user: User) => {
          this.userService.userDetails.next(user);
          this.router.navigate(['mode-select']);
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

  login() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['mode-select']);
    } else {
      this.userService.getMyUserDetails().subscribe({
        next: (user: User) => {
          this.userService.userDetails.next(user);
          this.router.navigate(['mode-select']);
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
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['mode-select']);
    } else {
      this.userService.getMyUserDetails().subscribe({
        next: (user: User) => {
          this.userService.userDetails.next(user);
          this.router.navigate(['mode-select']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.status === 'UNAUTHORIZED') {
            this.router.navigate(['signup']);
          } else if (err.error?.status === 'SERVICE_UNAVAILABLE') {
            // load error screen
          }
        },
      });
    }
  }
}
