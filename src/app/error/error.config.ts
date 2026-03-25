import { ErrorConfig, ErrorType } from './error.type';

export const ERROR_CONFIG_MAP: Record<ErrorType, ErrorConfig> = {
  [ErrorType.SERVER_ERROR]: {
    title: 'Server Temporarily Unavailable',
    subtitle:
      'Failed to connect to the AI fashion design service. Please try again.',
    icon: 'triangle-alert',
    primaryAction: {
      label: 'Try Again',
      action: 'retry',
    },
    secondaryAction: {
      label: 'Back to Home',
      action: 'home',
    },
    tips: [
      'Refresh the page and try again',
      'Check your internet connection',
      'Clear your browser cache',
      'Try again in a few minutes',
    ],
  },

  [ErrorType.OUT_OF_CREDITS]: {
    title: "Oh no! You're out of credits",
    subtitle: "It looks like you've run out of credits. Top up to continue.",
    icon: 'coins',
    badge: 'Error 402',
    primaryAction: {
      label: 'Top Up Credits',
      action: 'topup',
    },
    secondaryAction: {
      label: 'View Plans',
      action: 'plans',
    },
  },
};
