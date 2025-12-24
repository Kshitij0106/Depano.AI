import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from 'src/app/services/user.service';
import { OtpValidateRequest } from '../models/otpValidateRequest.model';
import { OtpSendRequest } from '../models/otpSendRequest.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule, LucideAngularModule],
})
export class SignupComponent implements OnInit {
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

  acceptTerms = false;

  otpSent: boolean = false;
  resendTimer = 0;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['gender']);
    }
  }

  /**
   * Generates a One-Time Password (OTP) to be sent to the user's phone for verification purposes.
   */
  registerUser() {
    this.authService.registerUser(this.otpSendRequest).subscribe({
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
        } else if (err.error?.status === 'CONFLICT') {
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

  goToLogin() {
    this.router.navigate(['login']);
  }

  /**
   * Resend OTP.
   */
  resendOtp(): void {
    if (this.resendTimer > 0) {
      this.toastr.info(`Please wait ${this.resendTimer}s before resending.`);
      return;
    }
    this.registerUser();
  }
}
