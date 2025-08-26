import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
import { OtpSendRequest } from '../models/otpSendRequest.model';
import { OtpValidateRequest } from '../models/otpValidateRequest.model';
import { OtpResponse } from '../models/otpResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves logged in user information from the session storage.
   */
  isLoggedIn(): boolean {
    if (
      (sessionStorage.getItem('status')?.match('loggedIn') &&
        sessionStorage.getItem('user') !== '') ||
      (localStorage.getItem('status')?.match('loggedIn') &&
        localStorage.getItem('user') !== '')
    ) {
      return true;
    }
    return false;
  }

  /**
   * Deletes logged in user information from the session storage.
   */
  logOut() {
    sessionStorage.clear();
    localStorage.clear();
  }

  /**
   * Saves user information in session storage.
   */
  saveUserInfo(userId: string) {
    sessionStorage.setItem('status', 'loggedIn');
    sessionStorage.setItem('user', userId);
  }

  /**
   * Saves user information in local storage for remembering even if browser is closed.
   */
  rememberUserInfo(userId: string) {
    localStorage.setItem('status', 'loggedIn');
    localStorage.setItem('user', userId);
  }

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {OtpSendRequest} otpSendRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  generateOtp(otpSendRequest: OtpSendRequest): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(
      environment.gateway + 'auth/generate-otp',
      otpSendRequest
    );
  }

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {OtpValidateRequest} otpValidateRequest - The user's registration details, including necessary information such as username and mobile number.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  validateOtp(otpValidateRequest: OtpValidateRequest): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/validate-otp',
      otpValidateRequest
    );
  }
}
