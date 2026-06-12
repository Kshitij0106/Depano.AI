import { Component, NgZone, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LucideAngularModule } from 'lucide-angular';
import { PaymentService } from '../services/payment.service';
import { ErrorService } from '../services/error.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PlanType } from './models/planType.model';
import { PaymentState } from './models/paymentState.model';
import { DEPANOAIPLANS } from './types/depanoai.plans.types';
import { Router } from '@angular/router';
import { CreateOrderResponse } from './models/createOrderResponse.model';
import {
  RazorpayCheckoutOptions,
  RazorpayFailureResponse,
  RazorpaySuccessResponse,
} from './types/razorpay.types';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  isLoggedIn = false;
  userDetails: User | null = null;

  readonly PaymentState = PaymentState;
  paymentState = PaymentState.IDLE;
  loading = false;

  readonly PlanType = PlanType;
  readonly plans = DEPANOAIPLANS;

  private razorpayInstance: InstanceType<Window['Razorpay']> | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private paymentService: PaymentService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.userService.userDetails.subscribe((user) => {
      this.isLoggedIn = user !== null;
      this.userDetails = user;
    });
  }

  async onPlanSelect(planType: PlanType): Promise<void> {
    if (this.loading) {
      return;
    }

    const hasSession = await this.checkUserSession();

    if (!hasSession) {
      return;
    }

    this.loading = true;
    this.paymentState = PaymentState.CREATING_ORDER;

    try {
      const order = await firstValueFrom(
        this.paymentService.createOrder(planType),
      );

      this.openRazorpayCheckout(planType, order);
    } catch (error: any) {
      this.paymentState = PaymentState.FAILED;
      this.loading = false;
      const status = error?.error?.status;

      if (
        status === 'SERVICE_UNAVAILABLE' ||
        status === 'INTERNAL_SERVER_ERROR'
      ) {
        this.errorService.errorSubject.next(status);
        this.router.navigate(['error']);
        return;
      }

      this.toastr.error(error?.error?.message ?? 'Unable to initiate payment.');
    }
  }

  private openRazorpayCheckout(
    planType: PlanType,
    order: CreateOrderResponse,
  ): void {
    this.paymentState = PaymentState.OPENING_CHECKOUT;

    const options: RazorpayCheckoutOptions = {
      key: environment.razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'DepanoAI',
      description: `${planType} purchase`,
      order_id: order.orderId,
      prefill: {
        contact: this.userDetails?.mobileNumber,
        email: this.userDetails?.email,
        name: this.userDetails?.userName,
      },
      notes: { orderId: order.orderId },
      retry: { enabled: true, max_count: 2 },
      theme: { color: '#000000' },

      modal: {
        ondismiss: () => {
          this.ngZone.run(() => {
            this.paymentState = PaymentState.CANCELLED;
            this.loading = false;
            this.toastr.warning('Payment cancelled.');
          });
        },
      },

      handler: async (response: RazorpaySuccessResponse) => {
        this.ngZone.run(async () => {
          this.paymentState = PaymentState.VERIFYING_PAYMENT;
          await this.verifyPayment(response);
        });
      },
    };

    this.razorpayInstance = new window.Razorpay(options);

    this.razorpayInstance.on(
      'payment.failed',
      (response: RazorpayFailureResponse) => {
        this.ngZone.run(() => {
          this.paymentState = PaymentState.FAILED;
          this.loading = false;
          this.toastr.error(response.error.description || 'Payment failed.');
        });
      },
    );

    this.razorpayInstance.open();
  }

  private async verifyPayment(
    response: RazorpaySuccessResponse,
  ): Promise<void> {
    this.paymentState = PaymentState.VERIFYING_PAYMENT;

    try {
      await firstValueFrom(
        this.paymentService.verifyPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }),
      );

      const user = await firstValueFrom(this.userService.getMyUserDetails());
      this.userService.saveUserInfo(user);

      this.paymentState = PaymentState.SUCCESS;
      this.toastr.success('Payment successful.');
      setTimeout(() => {
        this.paymentState = PaymentState.IDLE;
      }, 2000);
    } catch (error: any) {
      this.paymentState = PaymentState.FAILED;
      const status = error?.error?.status;

      if (
        status === 'SERVICE_UNAVAILABLE' ||
        status === 'INTERNAL_SERVER_ERROR'
      ) {
        this.errorService.errorSubject.next(status);
        this.router.navigate(['error']);
        return;
      }

      this.toastr.error(
        error?.error?.message ??
          'Payment verification failed. Please try again.',
        'Payment Failed',
      );
    } finally {
      this.loading = false;
    }
  }

  private async checkUserSession(): Promise<boolean> {
    try {
      const user = await firstValueFrom(this.userService.getMyUserDetails());
      this.userService.saveUserInfo(user);
      return true;
    } catch (error: any) {
      this.loading = false;
      this.toastr.warning('Please login to purchase a plan.');
      this.redirectToLogin();
      return false;
    }
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.razorpayInstance?.close();
  }
}
