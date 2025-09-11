import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = request;

    if (token) {
      authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Important to include cookies (refresh token)
      });
    } else {
      authReq = request.clone({ withCredentials: true });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;

          if (response.accessToken) {
            this.authService.saveUserInfo(
              response.userId,
              response.accessToken
            );
            this.refreshTokenSubject.next(response.accessToken);

            const newReq = request.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` },
              withCredentials: true,
            });

            return next.handle(newReq);
          }

          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => new Error('Refresh token failed'));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          const newReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token as string}` },
            withCredentials: true,
          });
          return next.handle(newReq);
        })
      );
    }
  }
}
