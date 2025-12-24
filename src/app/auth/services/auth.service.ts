import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
import { OtpSendRequest } from '../models/otpSendRequest.model';
import { OtpValidateRequest } from '../models/otpValidateRequest.model';
import { OtpResponse } from '../models/otpResponse.model';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {OtpSendRequest} otpSendRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  authenticateUser(otpSendRequest: OtpSendRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      environment.gateway + 'auth/login/otp',
      otpSendRequest
    );
  }

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {OtpSendRequest} otpSendRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  registerUser(otpSendRequest: OtpSendRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      environment.gateway + 'auth/signup/otp',
      otpSendRequest
    );
  }

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {OtpValidateRequest} otpValidateRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  verifyOtp(otpValidateRequest: OtpValidateRequest): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/verify',
      otpValidateRequest
    );
  }

  refreshToken(): Observable<Auth> {
    return this.http.post<Auth>(environment.gateway + 'auth/refresh', {});
  }

  /**
   * Deletes logged in user information from the session storage.
   */
  logout(): Observable<any> {
    this.clearUserInfo();
    return this.http.post<Auth>(environment.gateway + 'auth/logout', {});
  }

  getToken(): string | null {
    return this.accessToken;
  }

  /**
   * Saves user information in session storage.
   */
  saveToken(token: string) {
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
