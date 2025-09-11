import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public refreshCredits = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  /**
   * A getter that retrieves the user id form session storage.
   * @returns {Observable<User>} - An observable containing the user information.
   */
  public getUser(): Observable<User> {
    const userId = sessionStorage.getItem('user');
    return this.http.get<User>(environment.gateway + 'users' + '/' + userId);
  }

  /**
   * A getter that retrieves the user id form session storage.
   * @returns {string} - user id of the logged in user.
   */
  public getUserId(): string | null {
    return sessionStorage.getItem('user');
  }

  /**
   * Update credits after successfull generation of image.
   */
  public updateCredits() {
    this.refreshCredits.next(true);
  }
}
