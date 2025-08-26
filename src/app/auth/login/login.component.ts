import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OtpSendRequest } from '../models/otpSendRequest.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OtpValidateRequest } from '../models/otpValidateRequest.model';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  title = 'DEPANO AI';

  otpSendRequest: OtpSendRequest = {
    mobileNumber: '',
  };

  otpValidateRequest: OtpValidateRequest = {
    mobileNumber: '',
    userName: '',
    otp: '',
  };

  mobileError: boolean = false;

  otp: boolean = false;
  otpSent: boolean = false;
  otpChecked: boolean = false;

  rememberUser: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  /**
   * Navigates to homepage.
   */
  openHome() {
    this.router.navigate(['home']);
  }

  /**
   * Generates a One-Time Password (OTP) to be sent to the user's phone for verification purposes.
   */
  generateOtp() {
    this.authService.generateOtp(this.otpSendRequest).subscribe((result) => {
      if (result.status === 'Success') {
        this.otpSent = true;
        this.toastr.success('An OTP has been sent to your mobile number.');
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  /**
   * Validates the One-Time Password (OTP) provided by the user against the generated OTP.
   */
  validateOtp() {
    // if (this.rememberUser) {
    //   this.authService.rememberUserInfo(this.userAuth.mobileNumber);
    // }
    this.otpValidateRequest.mobileNumber = this.otpSendRequest.mobileNumber;
    this.authService
      .validateOtp(this.otpValidateRequest)
      .subscribe((result) => {
        if (result.status === 'Success') {
          this.otpChecked = true;
          this.authService.saveUserInfo(result.userId);
          this.toastr.success(result.message);
          this.router.navigate(['gender']);
        } else {
          this.toastr.error(result.message);
        }
      });
  }

  /**
   * Navigates to Sign up page.
   */
  goToSignUp() {
    this.router.navigate(['signup']);
  }
}
