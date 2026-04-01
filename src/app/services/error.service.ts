import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ERROR_CONFIG_MAP } from '../error/error.config';
import { ErrorType, ErrorConfig } from '../error/error-page.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorSubject = new BehaviorSubject<ErrorType | null>(null);

  constructor() {}

  getError(errorCode: ErrorType): ErrorConfig {
    return ERROR_CONFIG_MAP[errorCode];
  }
}
