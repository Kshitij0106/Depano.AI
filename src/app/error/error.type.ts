export enum ErrorType {
  SERVER_ERROR = 'SERVER_ERROR',
  OUT_OF_CREDITS = 'OUT_OF_CREDITS',
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
