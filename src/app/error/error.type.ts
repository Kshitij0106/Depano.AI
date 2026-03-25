export enum ErrorType {
  SERVER_ERROR = 'SERVER_ERROR',
  OUT_OF_CREDITS = 'OUT_OF_CREDITS',
}

export interface ErrorConfig {
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
  primaryAction: {
    label: string;
    action: 'retry' | 'topup';
  };
  secondaryAction?: {
    label: string;
    action: 'home' | 'plans';
  };
  tips?: string[];
}
