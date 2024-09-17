import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public refreshCredits = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  /**
   * A getter that retrieves the email form session storage.
   * @returns {Observable<User>} - An observable containing the user information.
   */
  public getUser(): Observable<User> {
    const email =
      sessionStorage.getItem('user') || localStorage.getItem('user');
    return this.http.get<User>(environment.gateway + 'users' + '/' + email);
  }

  /**
   * A getter that retrieves the email form session storage.
   * @returns {string} - email of the logged in user.
   */
  public getEmail(): string | null {
    return sessionStorage.getItem('user') || localStorage.getItem('user');
  }

  /**
   * Update credits after successfull generation of image.
   */
  public updateCredits() {
    this.refreshCredits.next(true);
  }
}
