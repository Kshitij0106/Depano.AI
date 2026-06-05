import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
import { OtpGenerateRequest } from '../models/otpGenerateRequest.model';
import { LoginOtpVerifyRequest } from '../models/loginOtpVerifyRequest.model';
import { SignupOtpVerifyRequest } from '../models/signupOtpVerifyRequest.model';
import { OtpResponse } from '../models/otpResponse.model';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {}

  /**
   * Generates and OTP request for user to login.
   *
   * @param {OtpGenerateRequest} otpGenerateRequest - The user's registration details, including necessary information such as mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  generateLoginOtp(
    otpGenerateRequest: OtpGenerateRequest,
  ): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      environment.gateway + 'auth/login/otp',
      otpGenerateRequest,
    );
  }

  /**
   * Returns an existing user once OTP is verified.
   *
   * @param {LoginOtpVerifyRequest} loginOtpRequest - The user's registration details, including necessary information such as mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  verifyAndAuthenticateUser(
    loginOtpRequest: LoginOtpVerifyRequest,
  ): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/login/verify',
      loginOtpRequest,
    );
  }

  /**
   * Generates and OTP request for user to signup.
   *
   * @param {OtpGenerateRequest} otpGenerateRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  generateSignupOtp(
    otpGenerateRequest: OtpGenerateRequest,
  ): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      environment.gateway + 'auth/signup/otp',
      otpGenerateRequest,
    );
  }

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {SignupOtpVerifyRequest} signupOtpVerifyRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  verifyAndRegisterUser(
    signupOtpVerifyRequest: SignupOtpVerifyRequest,
  ): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/signup/verify',
      signupOtpVerifyRequest,
    );
  }

  refreshToken(): Observable<Auth> {
    return this.http.post<Auth>(environment.gateway + 'auth/refresh', {});
  }

  /**
   * Deletes logged in user information from the session storage.
   */
  logout(): Observable<any> {
    return this.http.post<Auth>(environment.gateway + 'auth/logout', {});
  }

  getToken(): string | null {
    return this.accessToken;
  }

  /**
   * Saves user information in session storage.
   */
  saveLoginInfo(token: string) {
    this.accessToken = token;
    sessionStorage.setItem('isLoggedIn', 'true');
  }

  clearUserInfo() {
    sessionStorage.clear();
    localStorage.clear();
    this.accessToken = null;
    this.userService.clearUserDetails();
  }

  /**
   * Checks if the user is logged in by verifying the presence and validity of a JWT token in session storage.
   */
  isLoggedIn(): boolean {
    return (
      !!this.accessToken || sessionStorage.getItem('isLoggedIn') === 'true'
    );
  }
}
