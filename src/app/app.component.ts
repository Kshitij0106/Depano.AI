import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { User, UserService } from './services/user.service';
import { AuthService } from './auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [RouterOutlet, NgxUiLoaderModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Depano AI';

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.restoreUserSession();
  }

  restoreUserSession(): void {
    if (!this.authService.isLoggedIn() || this.userService.userDetails.value) {
      return;
    }

    this.userService.getMyUserDetails().subscribe({
      next: (user: User) => this.userService.saveUserInfo(user),
      error: (err: HttpErrorResponse) => {
        console.error('Failed to restore user session', err);
      },
    });
  }
}
