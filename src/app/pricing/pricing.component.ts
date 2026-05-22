import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LucideAngularModule } from 'lucide-angular';
import { PlanCode, PricingPlan, VerifyPaymentResponse } from './payment.model';
import { PaymentService } from '../services/payment.service';

type PaymentState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  isLoggedIn: boolean = false;
  credits: string = '';

  paymentState: PaymentState = 'idle';
  processingPlanCode: PlanCode | null = null;
  successfulPlanCode: PlanCode | null = null; // Track which plan succeeded
  paymentSuccessData: VerifyPaymentResponse | null = null;
  paymentErrorMessage: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private paymentService: PaymentService,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userService.updateUserDetails();
      this.userService.userDetails.subscribe((user) => {
        this.credits = user.credits;
      });
    }
  }

  @Output() selectPlan = new EventEmitter<{
    name: string;
    price: string;
    images: string;
    icon: string;
  }>();

  @Output() navigateHome = new EventEmitter<void>();
  @Output() navigateDashboard = new EventEmitter<void>();

  plans: PricingPlan[] = [
    {
      planCode: 'DP_STARTER',
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
      planCode: 'DP_DESIGNER',
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
      planCode: 'DP_STUDIO',
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

  async onSelect(plan: PricingPlan) {
    if (!this.isLoggedIn) {
      alert('Please login to purchase a plan.');
      return;
    }
    if (this.paymentState === 'loading') return;

    // Reset any previous error/success state
    this.paymentState = 'loading';
    this.processingPlanCode = plan.planCode;
    this.paymentErrorMessage = '';
    this.paymentSuccessData = null;

    this.selectPlan.emit({
      name: plan.name,
      price: plan.price,
      images: plan.images,
      icon: plan.icon,
    });

    try {
      // Get user details for Razorpay prefill
      const userSub = this.userService.userDetails.getValue?.();
      const userDetails = {
        name: userSub?.userName || '',
        email: userSub?.userName || '', // Using userName as fallback (can be updated later)
        contact: '', // Contact not available in current User model
      };

      // ── THE FULL PAYMENT FLOW IN ONE CALL ──
      const result = await this.paymentService.initiatePurchase(
        plan.planCode,
        userDetails,
      );

      if (result.success) {
        this.paymentState = 'success';
        this.successfulPlanCode = plan.planCode; // Track which plan succeeded
        this.paymentSuccessData = result;

        // Refresh user credits to show updated balance
        this.userService.updateUserDetails();

        // Auto-reset to idle after 5 seconds so user can buy again
        setTimeout(() => {
          this.paymentState = 'idle';
          this.processingPlanCode = null;
          this.successfulPlanCode = null;
          this.paymentSuccessData = null;
        }, 5000);
      } else {
        // Backend returned success:false
        this.paymentState = 'error';
        this.paymentErrorMessage =
          result.message || 'Payment verification failed.';
        this._autoResetError();
      }
    } catch (error: unknown) {
      this.paymentState = 'error';

      if (error instanceof Error) {
        // "Payment cancelled by user" → user dismissed popup, not really an error
        if (error.message.includes('cancelled')) {
          this.paymentErrorMessage = 'Payment was cancelled.';
        } else {
          this.paymentErrorMessage = error.message;
        }
      } else {
        this.paymentErrorMessage =
          'An unexpected error occurred. Please try again.';
      }

      this._autoResetError();
    } finally {
      // Always clear the "which plan is loading" state
      this.processingPlanCode = null;
    }
  }

  // ── Helper: check if a specific plan is currently processing ─
  isProcessing(planCode: PlanCode): boolean {
    return (
      this.paymentState === 'loading' && this.processingPlanCode === planCode
    );
  }

  // ── Helper: check if a specific plan was successfully purchased ─
  isSuccessful(planCode: PlanCode): boolean {
    return (
      this.paymentState === 'success' && this.successfulPlanCode === planCode
    );
  }

  private _autoResetError(): void {
    setTimeout(() => {
      this.paymentState = 'idle';
      this.paymentErrorMessage = '';
    }, 4000);
  }

  onHome() {
    this.navigateHome.emit();
  }

  onDashboard() {
    this.navigateDashboard.emit();
  }
}
