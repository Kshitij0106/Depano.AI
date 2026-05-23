import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageResponse } from '../generate/models/imageResponse.model';
import { PromptService } from './prompt.service';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public imageUrl = new BehaviorSubject<string>('');
  public sketchUrl = new BehaviorSubject<string>('');

  public imageSubject = new BehaviorSubject<ImageResponse | null>(null);

  constructor(
    private http: HttpClient,
    private promptService: PromptService,
    private errorService: ErrorService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  generateImage() {
    let userInput = this.promptService.getPrompt();
    this.imageSubject.next(null);
    this.http
      .post<ImageResponse>(environment.gateway + 'images', userInput)
      .subscribe({
        next: (res) => this.imageSubject.next(res),
        error: (err) => {
          if (err.error?.status === 'UNPROCESSABLE_ENTITY') {
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
   * Sends a request again to the API for image generation based on user prompts.
   *
   * @param imageId - The id of the image.
   * @returns {Observable<ImageResponse>} - An observable containing the server's response, which includes generated images.
   */
  regenerateImage(imageId: string): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(
      environment.gateway + 'images/' + imageId + '/regenerate',
      {},
    );
  }

  editImage(formData: FormData): Observable<ImageResponse> {
    return this.http.put<ImageResponse>(
      environment.gateway + 'images',
      formData,
    );
  }

  sketchToImage(formData: FormData) {
    this.http
      .post<ImageResponse>(environment.gateway + 'images/sketch', formData)
      .subscribe({
        next: (res) => this.imageSubject.next(res),
        error: (err) => {
          if (err.error?.status === 'UNPROCESSABLE_ENTITY') {
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

  async prepareFormData(
    type: 'sketch' | 'image',
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

  setImageId(imageId: string) {
    localStorage.setItem('imageId', imageId);
  }

  getImageId() {
    return localStorage.getItem('imageId');
  }

  clearImageData() {
    localStorage.removeItem('imageId');
    this.imageUrl.next('');
    this.sketchUrl.next('');
    this.imageSubject.next(null);
  }
}
