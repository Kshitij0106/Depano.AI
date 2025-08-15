import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { SignUpUser } from '../models/signUpUser';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  title = 'DEPANO AI';
  confirmPassword: string = '';
  cnfrmPassError: boolean = false;

  emailPattern = /^[^@]+@[^@]+\.com$/;
  emailRegex: RegExp = new RegExp(this.emailPattern);
  emailError: boolean = false;

  passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  passwordRegex: RegExp = new RegExp(this.passwordPattern);
  passError: boolean = false;

  otp: boolean = false;

  signUpUser: SignUpUser = {
    email: '',
    password: '',
    name: '',
    otp: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  /**
   * Navigates to homepage.
   * Empties the breadcrumb list.
   */
  openHome() {
    this.router.navigate(['home']);
  }

  /**
   * Validates the user's email format using a regular expression (regex).
   * Sets emailError `true` if the email format is valid according to the regex pattern, otherwise `false`.
   */
  checkEmail() {
    if (!this.emailRegex.test(this.signUpUser.email)) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  /**
   * Generates a One-Time Password (OTP) to be sent to the user's email for verification purposes.
   */
  generateOtp() {
    this.signUpUser.otp = '';
    if (this.passwordRegex.test(this.signUpUser.password)) {
      if (this.signUpUser.password !== this.confirmPassword) {
        this.cnfrmPassError = true;
      } else {
        this.authService.signUp(this.signUpUser).subscribe((result) => {
          if (result.status === 'Success') {
            this.otp = true;
            this.passError = false;
            this.toastr.success('An OTP has been sent to your email address.');
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
   * Verifies the One-Time Password (OTP) provided by the user against the generated OTP.
   */
  verifyOtp() {
    this.authService.register(this.signUpUser).subscribe((result) => {
      if (result.status === 'Success') {
        this.authService.saveUserInfo(this.signUpUser.email);
        this.toastr.success(result.message);
        this.router.navigate(['gender']);
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  /**
   * Navigates to login page.
   */
  goToLogin() {
    this.router.navigate(['login']);
  }
}
