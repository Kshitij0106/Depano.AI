import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { DesignResponse } from '../generate/models/designResponse.model';
import { PromptService } from './prompt.service';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  public designUrl = new BehaviorSubject<string>('');
  public sketchUrl = new BehaviorSubject<string>('');

  public designSubject = new BehaviorSubject<DesignResponse | null>(null);

  constructor(
    private http: HttpClient,
    private promptService: PromptService,
    private errorService: ErrorService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  generateDesign() {
    let userInput = this.promptService.getPrompt();
    this.designSubject.next(null);
    this.http
      .post<DesignResponse>(environment.gateway + 'designs', userInput)
      .subscribe({
        next: (res) => this.designSubject.next(res),
        error: (err) => {
          if (err.error?.status === 'BAD_REQUEST') {
            this.toastr.error(
              err.error?.message || 'Invalid input. Please try again.',
            );
          } else {
            this.errorService.errorSubject.next(err.error?.status);
            this.router.navigate(['error']);
          }
        },
      });
  }

  sketchToDesign(formData: FormData) {
    this.http
      .post<DesignResponse>(environment.gateway + 'designs/sketch', formData)
      .subscribe({
        next: (res) => this.designSubject.next(res),
        error: (err) => {
          if (err.error?.status === 'BAD_REQUEST') {
            this.toastr.error(
              err.error?.message || 'Invalid input. Please try again.',
            );
          } else {
            this.errorService.errorSubject.next(err.error?.status);
            this.router.navigate(['error']);
          }
        },
      });
  }

  dressToDesign(formData: FormData) {
    this.http
      .post<DesignResponse>(environment.gateway + 'designs/dress', formData)
      .subscribe({
        next: (res) => this.designSubject.next(res),
        error: (err) => {
          if (err.error?.status === 'BAD_REQUEST') {
            this.toastr.error(
              err.error?.message || 'Invalid input. Please try again.',
            );
          } else {
            this.errorService.errorSubject.next(err.error?.status);
            this.router.navigate(['error']);
          }
        },
      });
  }

  /**
   * Sends a request again to the API for design generation based on user prompts.
   *
   * @param designId - The id of the design.
   * @returns {Observable<DesignResponse>} - An observable containing the server's response, which includes generated designs.
   */
  regenerateDesign(designId: string): Observable<DesignResponse> {
    return this.http.post<DesignResponse>(
      environment.gateway + 'designs/' + designId + '/regenerate',
      {},
    );
  }

  editDesign(designId: string, userPrompt: string): Observable<DesignResponse> {
    return this.http.put<DesignResponse>(
      environment.gateway + 'designs/' + designId,
      userPrompt,
    );
  }

  async prepareFormData(
    type: 'sketch' | 'dress',
    image: File,
    prompt: string,
  ): Promise<FormData> {
    const formData = new FormData();

    try {
      formData.append(type, image, `${type}.png`);
      formData.append('prompt', prompt);

      return formData;
    } catch (err) {
      console.error('Error fetching blobs:', err);
      throw err;
    }
  }

  async fetchImageFromUrl(url: string, filename = 'image.png'): Promise<File> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const blob = await response.blob();

    let mimeType = blob.type;

    if (!mimeType || mimeType === 'application/octet-stream') {
      mimeType = this.detectMimeTypeFromFileName(filename);
    }

    return new File([blob], filename, { type: mimeType });
  }

  private detectMimeTypeFromFileName(fileName: string): string {
    const lowerCaseName = fileName.toLowerCase();

    if (lowerCaseName.endsWith('.jpg') || lowerCaseName.endsWith('.jpeg')) {
      return 'image/jpeg';
    }

    if (lowerCaseName.endsWith('.png')) {
      return 'image/png';
    }

    if (lowerCaseName.endsWith('.heic')) {
      return 'image/heic';
    }

    if (lowerCaseName.endsWith('.heif')) {
      return 'image/heif';
    }

    return 'application/octet-stream';
  }

  setDesignId(designId: string) {
    localStorage.setItem('designId', designId);
  }

  getDesignId() {
    return localStorage.getItem('designId');
  }

  clearDesignData() {
    localStorage.removeItem('designId');
    this.designUrl.next('');
    this.sketchUrl.next('');
    this.designSubject.next(null);
  }
}
