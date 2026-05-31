import {
  RazorpayCheckoutOptions,
  RazorpayFailureResponse,
} from './razorpay.types';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => {
      open(): void;

      close(): void;

      on(
        event: 'payment.failed',
        callback: (response: RazorpayFailureResponse) => void,
      ): void;
    };
  }
}

export {};
