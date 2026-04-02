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
import { ErrorService } from 'src/app/services/error.service';

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
    private errorService: ErrorService,
  ) {}

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  validateUserSession(destination: string) {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['mode-select']);
    } else {
      this.userService.getMyUserDetails().subscribe({
        next: (user: User) => {
          this.userService.userDetails.next(user);
          this.router.navigate(['mode-select']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.status === 'UNAUTHORIZED') {
            if (destination === 'login') {
              this.router.navigate(['login']);
            } else if (destination === 'signup') {
              this.router.navigate(['signup']);
            }
          } else {
            this.errorService.errorSubject.next(err.error?.status);
            this.router.navigate(['error']);
          }
        },
      });
    }
  }
}
