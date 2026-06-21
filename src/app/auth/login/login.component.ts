import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OtpGenerateRequest } from '../models/otpGenerateRequest.model';
import { LoginOtpVerifyRequest } from '../models/loginOtpVerifyRequest.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserService } from 'src/app/services/user.service';
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
  otpGenerateRequest: OtpGenerateRequest = {
    mobileNumber: '',
  };

  loginOtpVerifyRequest: LoginOtpVerifyRequest = {
    mobileNumber: '',
    otp: '',
  };

  mobileError: boolean = false;

  otpSent: boolean = false;
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpError: string = '';

  resendCountdown: number = 0;
  resendDisabled: boolean = false;
  isResendBlocked: boolean = false;
  private resendTimerRef: any = null;
  isverifyBlocked: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  openHome() {
    this.router.navigate(['home']);
  }

  /**
   * Generates a One-Time Password (OTP) to be sent to the user's phone for verification purposes.
   */
  authenticateUser() {
    let mobile = this.otpGenerateRequest.mobileNumber?.trim();

    if (mobile) {
      this.otpGenerateRequest.mobileNumber = mobile.replace(/^(\+91|91)/, '');
    }

    this.authService.generateLoginOtp(this.otpGenerateRequest).subscribe({
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
        } else if (
          err.error?.status === 'NOT_FOUND' ||
          err.error?.status === 'BAD_REQUEST'
        ) {
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
    this.loginOtpVerifyRequest.mobileNumber =
      this.otpGenerateRequest.mobileNumber;
    this.authService
      .verifyAndAuthenticateUser(this.loginOtpVerifyRequest)
      .subscribe({
        next: (result) => {
          if (result.status === 'Success') {
            this.authService.saveLoginInfo(result.accessToken);

            this.userService.getMyUserDetails().subscribe({
              next: (user: User) => {
                this.userService.saveUserInfo(user);

                this.toastr.success(result.message);
                this.router.navigate(['mode']);
              },
              error: (err: HttpErrorResponse) => {
                if (err.error?.status === 'NOT_FOUND') {
                  this.toastr.error(err.error?.message);
                } else {
                  this.toastr.error(
                    'Unable to complete log in. Please try again.',
                  );
                }
              },
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.status === 'TOO_MANY_REQUESTS') {
            this.toastr.error(err.error?.message);
            this.isverifyBlocked = true;
          } else if (err.error?.status === 'BAD_REQUEST') {
            this.toastr.error(err.error?.message);
          } else {
            this.toastr.error('Unable to complete log in. Please try again.');
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
    this.loginOtpVerifyRequest.otp = this.otpDigits.join('');
  }
}
