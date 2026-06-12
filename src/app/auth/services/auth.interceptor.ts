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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private publicPaths = [
    '/auth/generate-otp',
    '/auth/validate-otp',
    '/auth/refresh',
    '/auth/logout',
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const isUnprotected = this.publicPaths.some((url) =>
      request.url.includes(url),
    );

    let authReq = request;

    if (isUnprotected) {
      authReq = request.clone({ withCredentials: true });
    } else {
      const token = this.authService.getToken();
      if (token) {
        authReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        authReq = request.clone({ withCredentials: true });
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isUnprotected) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => error);
      }),
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this.isRefreshing = false;

          if (response.accessToken) {
            this.authService.saveLoginInfo(response.accessToken);
            this.refreshTokenSubject.next(response.accessToken);

            const newReq = request.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` },
              withCredentials: true,
            });

            return next.handle(newReq);
          }

          this.forceLogout();
          return throwError(() => new Error('Refresh token failed'));
        }),
        catchError((err) => {
          this.isRefreshing = false;

          if (err.status === 401) {
            this.forceLogout();
          } else {
            // show error page
            console.warn('Refresh failed (not due to auth):', err.message);
          }

          return throwError(() => err);
        }),
      );
    } else {
      // Queue requests until refresh completes
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          const newReq = request.clone({
            setHeaders: { Authorization: `Bearer ${token as string}` },
            withCredentials: true,
          });
          return next.handle(newReq);
        }),
      );
    }
  }

  private forceLogout() {
    this.authService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
