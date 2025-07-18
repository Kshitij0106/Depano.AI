import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../models/userAuth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { SignUpUser } from '../models/signUpUser';

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
  saveUserInfo(email: string) {
    sessionStorage.setItem('status', 'loggedIn');
    sessionStorage.setItem('user', email);
  }

  /**
   * Saves user information in local storage for remembering even if browser is closed.
   */
  rememberUserInfo(email: string) {
    localStorage.setItem('status', 'loggedIn');
    localStorage.setItem('user', email);
  }

  /**
   * Authenticates the user by sending the login credentials to the server.
   *
   * @param {UserAuth} userAuth - The user's authentication information, including username and password.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  login(userAuth: UserAuth): Observable<Auth> {
    return this.http.post<Auth>(environment.gateway + 'auth/login', userAuth);
  }

  /**
   * Registers a new user by sending their details to the server and generates an OTP.
   * The OTP is sent to the user's email for verification.
   *
   * @param {SignUpUser} signUpUser - The user's registration details, including necessary information such as username, email, and password.
   * @returns {Observable<Auth>} - An observable containing the otp validation response after OTP verification.
   */
  signUp(signUpUser: SignUpUser): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/signup',
      signUpUser
    );
  }

  /**
   * Registers a new user by sending their details to the server.
   *
   * @param {SignUpUser} signUpUser - The user's registration details, including necessary information such as username, email, and password.
   * @returns {Observable<Auth>} - An observable containing the authentication response.
   */
  register(signUpUser: SignUpUser): Observable<Auth> {
    return this.http.post<Auth>(
      environment.gateway + 'auth/register',
      signUpUser
    );
  }

  /**
   * Initiates a password reset process by sending a password reset request to the server.
   * An OTP is sent to the user's registered email for verification.
   *
   * @param {SignUpUser} user - The user's information (such as email or username) to identify the account for the password reset request.
   * @returns {Observable<Auth>} - An observable containing the response, confirming that the reset request has been processed and the OTP has been sent.
   */
  forgotPasswordRequest(user: SignUpUser): Observable<Auth> {
    return this.http.put<Auth>(
      environment.gateway + 'auth/forgotPasswordRequest',
      user
    );
  }

  /**
   * Verifies the OTP sent to the user's email as part of the password reset process.
   *
   * @param {SignUpUser} user - The user's information, including the OTP for verification.
   * @returns {Observable<Auth>} - An observable containing the response, confirming whether the OTP is valid and the verification is successful.
   */
  forgotPasswordRequestVerification(user: SignUpUser): Observable<Auth> {
    return this.http.put<Auth>(
      environment.gateway + 'auth/forgotPassword/otp',
      user
    );
  }

  /**
   * Changes the user's password after verifying the reset request.
   * This is typically called after the user has successfully verified the OTP.
   *
   * @param {SignUpUser} user - The user's information, including the new password and any required verification tokens (such as OTP or reset token).
   * @returns {Observable<Auth>} - An observable containing the response, confirming the password change was successful.
   */
  changePassword(user: SignUpUser): Observable<Auth> {
    return this.http.put<Auth>(
      environment.gateway + 'auth/resetPassword',
      user
    );
  }
}
