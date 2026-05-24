import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  PlanCode,
  CreateOrderResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  RazorpayCheckoutOptions,
} from '../pricing/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly apiUrl = environment.gateway;
  private readonly razorpayKeyId = environment.razorpayKeyId;

  constructor(private http: HttpClient) {}

  createOrder(planCode: PlanCode): Observable<CreateOrderResponse> {
    return this.http
      .post<CreateOrderResponse>(this.apiUrl + 'payments/' + planCode, {})
      .pipe(catchError(this.handleError));
  }

  verifyPayment(
    request: VerifyPaymentRequest,
  ): Observable<VerifyPaymentResponse> {
    return this.http
      .post<VerifyPaymentResponse>(this.apiUrl + 'payments/verify', request)
      .pipe(catchError(this.handleError));
  }

  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  openCheckout(
    orderData: CreateOrderResponse,
    userDetails?: { name?: string; email?: string; contact?: string },
  ): Promise<VerifyPaymentRequest> {
    return new Promise((resolve, reject) => {
      const options: RazorpayCheckoutOptions = {
        key: this.razorpayKeyId,
        amount: orderData.amountInPaise,
        currency: orderData.currency,
        name: 'DEPANO AI',
        description: 'Plan Purchase',
        // Note: order_id is commented out for frontend-only testing mode
        // In production: Uncomment this and ensure backend creates real Razorpay order
        order_id: orderData.gatewayOrderId,

        // handler is called by Razorpay when payment succeeds
        handler: (response: VerifyPaymentRequest) => {
          resolve(response);
        },

        prefill: {
          name: userDetails?.name || '',
          email: userDetails?.email || '',
          contact: userDetails?.contact || '',
        },

        theme: {
          color: '#6C63FF',
        },

        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled by user'));
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    });
  }

  async initiatePurchase(
    planCode: PlanCode,
    userDetails?: { name?: string; credits?: string | number },
  ): Promise<VerifyPaymentResponse> {
    // Step 1: Load Razorpay script
    const scriptLoaded = await this.loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error(
        'Failed to load Razorpay. Please check your internet connection.',
      );
    }

    // Step 2: Create order on backend
    const { firstValueFrom } = await import('rxjs');
    const orderData = await firstValueFrom(
      this.createOrder(planCode).pipe(catchError(this.handleError)),
    );

    // Step 3: Open Razorpay popup
    const paymentResponse = await this.openCheckout(orderData, userDetails);

    // Step 4: Verify with backend
    const verifyPayload: VerifyPaymentRequest = {
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_signature: paymentResponse.razorpay_signature,
    };

    const result = await firstValueFrom(
      this.verifyPayment(verifyPayload).pipe(catchError(this.handleError)),
    );

    return result;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Something went wrong. Please try again.';

    if (error.status === 400) {
      message = error.error?.message || 'Invalid request. Please try again.';
    } else if (error.status === 401) {
      message = 'You are not logged in. Please login and try again.';
    } else if (error.status === 409) {
      message = 'This order has already been processed.';
    } else if (error.status === 0) {
      message = 'Network error. Please check your internet connection.';
    } else if (error.status >= 500) {
      message = 'Server error. Please try again later.';
    }

    return throwError(() => new Error(message));
  }
}
