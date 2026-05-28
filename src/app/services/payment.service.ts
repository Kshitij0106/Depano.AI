import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlanType } from '../pricing/models/planType.model';
import { VerifyPaymentRequest } from '../pricing/models/verifyPaymentRequest.model';
import { CreateOrderResponse } from '../pricing/models/createOrderResponse.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createOrder(planCode: PlanType): Observable<CreateOrderResponse> {
    return this.http
      .post<CreateOrderResponse>(
        environment.gateway + 'payments/' + planCode,
        {},
      )
      .pipe(catchError(this.handleError));
  }

  verifyPayment(request: VerifyPaymentRequest): Observable<void> {
    return this.http
      .post<void>(environment.gateway + 'payments/verify', request)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Payment API Error', error);

    return throwError(() => error);
  }
}
