import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/userAuth';
import { ToastrService } from 'ngx-toastr';
import { SignUpUser } from '../models/signUpUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

  checkEmail() {
    if (!this.emailRegex.test(this.userAuth.email)) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }

  validate() {
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

  afterPasswordChange() {
    this.userAuth.email = '';
    this.changePasswordUser.email = '';
    this.changePasswordUser.password = '';
    this.changePasswordUser.otp = '';
    this.otp = false;
    this.otpSent = false;
    this.otpChecked = false;
  }

  goToSignUp() {
    this.router.navigate(['signup']);
  }
}
