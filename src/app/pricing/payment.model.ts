export type PlanCode = 'DP_STARTER' | 'DP_DESIGNER' | 'DP_STUDIO';

export interface PricingPlan {
  planCode: PlanCode;
  name: string;
  icon: string;
  price: string;
  images: string;
  credits: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface CreateOrderRequest {
  planCode: PlanCode;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentRequest {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  planCode: PlanCode;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  paymentId?: string;
  orderId?: string;
  creditsAdded?: number;
}

export interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => { open(): void };
  }
}
