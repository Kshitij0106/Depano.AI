import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LucideAngularModule } from 'lucide-angular';
import { PaymentService } from '../services/payment.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { PlanType } from './models/planType.model';
import { PaymentState } from './models/paymentState.model';
import { Router } from '@angular/router';
import { CreateOrderResponse } from './models/createOrderResponse.model';
import {
  RazorpayCheckoutOptions,
  RazorpayFailureResponse,
  RazorpaySuccessResponse,
} from './razorpay.types';
import { DepanoAIPlan } from './models/plans.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  credits: string = '';

  readonly PlanType = PlanType;
  readonly PaymentState = PaymentState;
  paymentState = PaymentState.IDLE;

  loading = false;

  private razorpayInstance: InstanceType<Window['Razorpay']> | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private paymentService: PaymentService,
    private errorService: ErrorService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.isUserLoggedIn()) {
      this.userService.userDetails.subscribe((user) => {
        this.credits = user.credits;
      });
    }
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  plans: DepanoAIPlan[] = [
    {
      planCode: PlanType.DP_STARTER,
      name: 'Starter Plan',
      icon: '🧵',
      price: '₹990',
      images: '100 Credits',
      credits: 100,
      description:
        'Perfect for students and independent designers exploring new ideas and experimenting with styles.',
      features: [
        'Access to all image generation & editing features',
        'Fast processing using Gemini Imagine & SDXL',
        'Ideal for light usage',
      ],
      popular: false,
    },
    {
      planCode: PlanType.DP_DESIGNER,
      name: 'Designer Plan',
      icon: '👗',
      price: '₹2,090',
      images: '200 Credits',
      credits: 200,
      description:
        'Best for freelance designers and growing teams who need more creative bandwidth.',
      features: [
        'All Starter features',
        'Priority image generation',
        'Ideal for regular usage',
      ],
      popular: true,
    },
    {
      planCode: PlanType.DP_STUDIO,
      name: 'Studio Plan',
      icon: '🏢',
      price: '₹2,490',
      images: '300 Credits',
      credits: 300,
      description:
        'Designed for fashion houses and power users who need scale and efficiency.',
      features: [
        'All Designer features',
        'Dedicated support',
        'Best value per image',
        'Ideal for heavy usage',
      ],
      popular: false,
    },
  ];

  async onPlanSelect(planType: PlanType): Promise<void> {
    if (this.loading) {
      return;
    }

    const validSession = await this.checkUserSession();

    if (!validSession) {
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
      console.error('Create Order Failed', error);

      this.paymentState = PaymentState.FAILED;
      this.loading = false;

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
      prefill: { contact: '', email: '' },
      notes: { orderId: order.orderId },
      retry: { enabled: true, max_count: 2 },
      theme: { color: '#000000' },

      modal: {
        ondismiss: () => {
          this.paymentState = PaymentState.CANCELLED;
          this.loading = false;
          this.toastr.warning('Payment cancelled.');
        },
      },

      handler: async (response: RazorpaySuccessResponse) => {
        this.paymentState = PaymentState.VERIFYING_PAYMENT;
        await this.verifyPayment(response);
      },
    };

    this.razorpayInstance = new window.Razorpay(options);

    this.razorpayInstance.on(
      'payment.failed',
      (response: RazorpayFailureResponse) => {
        console.error('Payment Failed', response);
        this.paymentState = PaymentState.FAILED;
        this.loading = false;

        this.toastr.error(response.error.description || 'Payment failed.');
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

      this.paymentState = PaymentState.SUCCESS;

      this.toastr.success('Payment successful.');
    } catch (error: any) {
      console.error('Payment Verification Failed', error);

      this.paymentState = PaymentState.FAILED;

      this.toastr.error(
        error?.error?.message ?? 'Payment verification failed.',
      );
    } finally {
      this.loading = false;
    }
  }

  private async checkUserSession(): Promise<boolean> {
    if (this.isUserLoggedIn()) {
      return true;
    } else {
      this.userService.getMyUserDetails().subscribe({
        next: (user: User) => {
          this.userService.userDetails.next(user);
          this.credits = this.userService.userDetails.value.credits;
          return true;
        },
        error: (err: HttpErrorResponse) => {
          if (err.error?.status === 'UNAUTHORIZED') {
            this.loading = false;
            this.toastr.warning('Please login to purchase a plan.');
            this.redirectToLogin();
          } else {
            this.errorService.errorSubject.next(err.error?.status);
            this.router.navigate(['error']);
          }
        },
      });
    }
    return false;
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.razorpayInstance?.close();
  }
}
