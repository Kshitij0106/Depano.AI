import { ErrorConfig, ErrorType } from './error.type';

export const ERROR_CONFIG_MAP: Record<ErrorType, ErrorConfig> = {
  [ErrorType.SERVER_ERROR]: {
    title: 'Server Temporarily Unavailable',
    subtitle: 'Failed to connect. Please try again.',
    icon: 'triangle-alert',
    actions: [
      {
        label: 'Try Again',
        action: 'retry',
        icon: 'refresh-ccw',
        position: 'primaryRow',
      },
      {
        label: 'Back to Home',
        action: 'home',
        icon: 'house',
        position: 'primaryRow',
      },
    ],
    tips: [
      'Refresh the page and try again',
      'Check your internet connection',
      'Clear your browser cache',
      'Try again in a few minutes',
    ],
  },

  [ErrorType.OUT_OF_CREDITS]: {
    title: "Oh no! You're out of credits",
    subtitle: 'Top up to continue.',
    icon: 'coins',
    actions: [
      {
        label: 'Top Up Credits',
        action: 'topup',
        icon: 'credit-card',
        position: 'primaryRow',
      },
      {
        label: 'View Plans',
        action: 'plans',
        icon: 'sparkles',
        position: 'primaryRow',
      },
      {
        label: 'Back to Home',
        action: 'home',
        icon: 'house',
        position: 'secondaryRow',
      },
    ],
  },
};
