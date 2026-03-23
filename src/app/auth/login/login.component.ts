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
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
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

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && !/^\d$/.test(value)) {
      input.value = '';
      this.otpDigits[index] = '';
      return;
    }

    this.otpDigits[index] = value;
    this.otpError = '';

    if (value && index < 5) {
      const nextInput = (event.target as HTMLInputElement)
        .nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    this.updateOtpValue();
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        const prevInput = input.previousElementSibling as HTMLInputElement;
        if (prevInput) {
          this.otpDigits[index - 1] = '';
          prevInput.value = '';
          prevInput.focus();
          this.updateOtpValue();
        }
      } else if (input.value !== '') {
        this.otpDigits[index] = '';
        this.updateOtpValue();
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = input.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (event.key === 'ArrowRight' && index < 5) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  private updateOtpValue(): void {
    this.otpValidateRequest.otp = this.otpDigits.join('');
  }
}
