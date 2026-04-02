export enum ErrorType {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
}

export interface ErrorAction {
  label: string;
  action: 'retry' | 'topup' | 'home' | 'plans';
  icon: string;
  position?: 'primaryRow' | 'secondaryRow';
}

export interface ErrorConfig {
  title: string;
  subtitle: string;
  icon: string;
  actions: ErrorAction[];
  tips?: string[];
}
