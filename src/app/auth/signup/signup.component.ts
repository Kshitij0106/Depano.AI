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
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpError: string = '';

  resendCountdown: number = 0;
  resendDisabled: boolean = false;
  isResendBlocked: boolean = false;
  private resendTimerRef: any = null;
  isverifyBlocked: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
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
          this.startResendTimer();
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.error?.status === 'TOO_MANY_REQUESTS') {
          this.toastr.error(err.error?.message);
          this.isResendBlocked = true;
        } else if (err.error?.status === 'CONFLICT') {
          this.toastr.error(err.error?.message);
        } else {
          this.toastr.error(
            'Unable to send OTP at the moment. Please try again shortly.',
          );
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
        if (err.error?.status === 'TOO_MANY_REQUESTS') {
          this.toastr.error(err.error?.message);
          this.isverifyBlocked = true;
        } else if (err.error?.status === 'BAD_REQUEST') {
          this.toastr.error(err.error?.message);
        } else {
          this.toastr.error(
            'Unable to verify OTP at the moment. Please try again shortly.',
          );
        }
      },
    });
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow single digit
    if (value && !/^\d$/.test(value)) {
      input.value = '';
      this.otpDigits[index] = '';
      return;
    }

    this.otpDigits[index] = value;
    this.otpError = '';

    // Auto-focus to next input
    if (value && index < 5) {
      const nextInput = (event.target as HTMLInputElement)
        .nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Update the combined OTP value
    this.updateOtpValue();
  }

  onOtpKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        // Move to previous input on backspace if current is empty
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

  private startResendTimer(seconds: number = 20) {
    this.resendDisabled = true;
    this.resendCountdown = seconds;

    if (this.resendTimerRef) {
      clearInterval(this.resendTimerRef);
    }

    this.resendTimerRef = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        clearInterval(this.resendTimerRef);
        this.resendTimerRef = null;
        this.resendDisabled = false;
      }
    }, 1000);
  }

  private updateOtpValue(): void {
    this.otpValidateRequest.otp = this.otpDigits.join('');
  }
}
