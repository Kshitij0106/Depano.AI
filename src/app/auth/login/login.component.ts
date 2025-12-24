import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OtpSendRequest } from '../models/otpSendRequest.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OtpValidateRequest } from '../models/otpValidateRequest.model';
import { UserService } from 'src/app/services/user.service';
import { LucideAngularModule } from 'lucide-angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, LucideAngularModule],
})
export class LoginComponent {
  otpSendRequest: OtpSendRequest = {
    mobileNumber: '',
  };

  otpValidateRequest: OtpValidateRequest = {
    mobileNumber: '',
    userName: '',
    otp: '',
    email: '',
  };

  mobileError: boolean = false;

  otpSent: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  /**
   * Generates a One-Time Password (OTP) to be sent to the user's phone for verification purposes.
   */
  authenticateUser() {
    this.authService.authenticateUser(this.otpSendRequest).subscribe({
      next: (result) => {
        if (result.status === 'Success') {
          this.otpSent = true;
          this.toastr.success('An OTP has been sent to your mobile number.');
        }
      },
      error: (err: HttpErrorResponse) => {
        if (
          err.error?.status === 'SERVICE_UNAVAILABLE' ||
          err.error?.status === 'INTERNAL_SERVER_ERROR'
        ) {
          // this.result = 'networkIssue';
        } else if (err.error?.status === 'NOT_FOUND') {
          this.toastr.error(err.error?.message);
        }
      },
    });
  }

  /**
   * Validates the One-Time Password (OTP) provided by the user against the generated OTP.
   */
  verifyOtp() {
    this.otpValidateRequest.mobileNumber = this.otpSendRequest.mobileNumber;
    this.authService.verifyOtp(this.otpValidateRequest).subscribe({
      next: (result) => {
        if (result.status === 'Success') {
          this.authService.saveToken(result.accessToken);
          this.toastr.success(result.message);
          this.router.navigate(['mode-select']);
          this.userService.updateUserDetails();
        }
      },
      error: (err: HttpErrorResponse) => {
        if (
          err.error?.status === 'SERVICE_UNAVAILABLE' ||
          err.error?.status === 'INTERNAL_SERVER_ERROR'
        ) {
          // this.result = 'networkIssue';
        } else if (err.error?.status === 'BAD_REQUEST') {
          this.toastr.error(err.error?.message);
        }
      },
    });
  }

  /**
   * Navigates to Sign up page.
   */
  goToSignUp() {
    this.router.navigate(['signup']);
  }
}
