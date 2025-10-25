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

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, LucideAngularModule],
})
export class LoginComponent implements OnInit {
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

  // /**
  //  * Navigates to homepage.
  //  */
  // openHome() {
  //   this.router.navigate(['home']);
  // }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['gender']);
    }
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
    this.otpValidateRequest.mobileNumber = this.otpSendRequest.mobileNumber;
    this.authService
      .validateOtp(this.otpValidateRequest)
      .subscribe((result) => {
        if (result.status === 'Success') {
          this.authService.saveToken(result.accessToken);
          this.toastr.success(result.message);
          this.router.navigate(['mode-select']);
          this.userService.updateUserDetails();
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
