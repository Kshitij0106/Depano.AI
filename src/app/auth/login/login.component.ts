import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/userAuth';
import { ToastrService } from 'ngx-toastr';
import { SignUpUser } from '../models/signUpUser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  title = 'DEPANO AI';
  userAuth: UserAuth = {
    email: '',
    password: '',
  };

  changePasswordUser: SignUpUser = {
    email: '',
    password: '',
    name: '',
    otp: '',
  };

  passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  passwordRegex: RegExp = new RegExp(this.passwordPattern);
  passError: boolean = false;

  emailPattern = /^[^@]+@[^@]+\.com$/;
  emailRegex: RegExp = new RegExp(this.emailPattern);
  emailError: boolean = false;

  otp: boolean = false;
  otpSent: boolean = false;
  otpChecked: boolean = false;

  confirmPassword: string = '';
  cnfrmPassError: boolean = false;

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
   * Validates the user's email format using a regular expression (regex).
   * Sets emailError `true` if the email format is valid according to the regex pattern, otherwise `false`.
   */
  checkEmail() {
    if (!this.emailRegex.test(this.userAuth.email)) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  /**
   * Validates the provided input data according to predefined rules or criteria.
   */
  validate() {
    if (this.rememberUser) {
      this.authService.rememberUserInfo(this.userAuth.email);
    }
    this.authService.login(this.userAuth).subscribe((result) => {
      if (result.status === 'Success') {
        this.authService.saveUserInfo(this.userAuth.email);
        this.toastr.success(result.message);
        this.router.navigate(['gender']);
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  forgotPassword() {
    this.otp = true;
  }

  /**
   * Generates a One-Time Password (OTP) to be sent to the user's email or phone for verification purposes.
   */
  generateOtp() {
    this.changePasswordUser.email = this.userAuth.email;
    this.authService
      .forgotPasswordRequest(this.changePasswordUser)
      .subscribe((result) => {
        if (result.status === 'Success') {
          this.otpSent = true;
          this.toastr.success('An OTP has been sent to your email address.');
        } else {
          this.toastr.error(result.message);
        }
      });
  }

  /**
   * Verifies the One-Time Password (OTP) provided by the user against the generated OTP.
   */
  verifyOtp() {
    this.changePasswordUser.email = this.userAuth.email;
    this.authService
      .forgotPasswordRequestVerification(this.changePasswordUser)
      .subscribe((result) => {
        if (result.status === 'Success') {
          this.otpChecked = true;
          this.toastr.success(result.message);
        } else {
          this.toastr.error(result.message);
        }
      });
  }

  /**
   * Changes the user's password by calling the authentication service.
   * This method typically requires the user to provide their current password and a new password.
   */
  changePassword() {
    if (this.passwordRegex.test(this.changePasswordUser.password)) {
      if (this.changePasswordUser.password !== this.confirmPassword) {
        this.cnfrmPassError = true;
      } else {
        this.authService
          .changePassword(this.changePasswordUser)
          .subscribe((result) => {
            if (result.status === 'Success') {
              this.passError = false;
              this.toastr.success(result.message);
              this.afterPasswordChange();
              this.router.navigate(['login']);
            } else {
              this.toastr.error(result.message);
            }
          });
      }
    } else {
      this.passError = true;
    }
  }

  /**
   * Resets all the user data in form.
   */
  afterPasswordChange() {
    this.userAuth.email = '';
    this.changePasswordUser.email = '';
    this.changePasswordUser.password = '';
    this.changePasswordUser.otp = '';
    this.otp = false;
    this.otpSent = false;
    this.otpChecked = false;
  }

  /**
   * Navigates to Sign up page.
   */
  goToSignUp() {
    this.router.navigate(['signup']);
  }
}
