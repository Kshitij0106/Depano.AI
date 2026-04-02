import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ERROR_CONFIG_MAP } from '../error/error.config';
import { ErrorType, ErrorConfig } from '../error/error.type';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorSubject = new BehaviorSubject<ErrorType | null>(null);

  constructor() {}

  getError(errorCode: ErrorType): ErrorConfig {
    return (
      ERROR_CONFIG_MAP[errorCode] ??
      ERROR_CONFIG_MAP[ErrorType.INTERNAL_SERVER_ERROR]
    );
  }
}
