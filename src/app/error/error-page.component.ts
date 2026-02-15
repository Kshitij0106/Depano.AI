import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LucideAngularModule } from 'lucide-angular';

export type ErrorType =
  | 'server'
  | 'network'
  | 'timeout'
  | 'general'
  | 'content-policy'
  | 'network-error'
  | 'out-of-credits'
  | 'generic-error'
  | 'server-error';

interface ErrorConfig {
  title: string;
  description: string;
  code: string;
  emoji: string;
  subtitle?: string;
  cta?: string;
}

@Component({
  standalone: true,
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
})
export class ErrorPageComponent {
  @Input() errorType: ErrorType = 'server';
  @Input() errorMessage?: string;

  @Output() retry = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();
  @Output() topUp = new EventEmitter<void>();
  @Output() viewPlans = new EventEmitter<void>();
  @Output() contactSupport = new EventEmitter<void>();

  isRetrying = false;

  constructor(private router: Router) {}

  reloadPage() {
    window.location.reload();
  }

  errorConfig: Record<ErrorType, ErrorConfig> = {
    server: {
      title: 'Server Temporarily Unavailable',
      description:
        'Our servers are currently unavailable. Please try again later.',
      code: '500',
      emoji: '⚠️',
    },
    network: {
      title: 'Connection Lost',
      description: 'Unable to connect. Please check your internet connection.',
      code: 'NET',
      emoji: '⚡',
    },
    timeout: {
      title: 'Request Timeout',
      description: 'The request took too long. Please try again.',
      code: '408',
      emoji: '⏱️',
    },
    general: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred.',
      code: 'ERR',
      emoji: '❌',
    },
    'content-policy': {
      title: 'Please Revise Your Input',
      description: 'Your input contains restricted content.',
      code: '403',
      emoji: '🚫',
      cta: 'Try again with different wording.',
    },
    'network-error': {
      title: 'Network Error',
      description: 'We’re having trouble connecting.',
      code: 'NET',
      emoji: '🌐',
      subtitle: 'Check your internet and retry.',
    },
    'out-of-credits': {
      title: "You're Out of Credits",
      description: 'Top up your credits to continue.',
      code: '402',
      emoji: '😕',
    },
    'generic-error': {
      title: 'Oops! Something Went Wrong',
      description: 'Unexpected issue occurred.',
      code: 'ERROR',
      emoji: '😕',
      subtitle: 'Please try again shortly.',
    },
    'server-error': {
      title: 'Server Error',
      description: 'Technical difficulty detected.',
      code: '500',
      emoji: '🔧',
      subtitle: 'Your data is safe.',
    },
  };

  get config() {
    return this.errorConfig[this.errorType];
  }

  async handleRetry() {
    this.isRetrying = true;
    await new Promise((res) => setTimeout(res, 1500));
    this.retry.emit();
    this.isRetrying = false;
  }

  get troubleshootingSteps(): string[] {
    switch (this.errorType) {
      case 'network-error':
        return [
          'Check internet connection',
          'Refresh the page',
          'Try again later',
        ];
      case 'content-policy':
        return [
          'Review your input',
          'Remove restricted words',
          'Contact support if needed',
        ];
      case 'out-of-credits':
        return [];
      default:
        return ['Refresh page', 'Clear cache', 'Try again later'];
    }
  }
}
