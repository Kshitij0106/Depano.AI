import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageResponse } from '../generate/models/imageResponse.model';
import { PromptService } from './prompt.service';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

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
  ) {}

  generateImage() {
    let userInput = this.promptService.getPrompt();
    this.imageSubject.next(null);
    this.http
      .post<ImageResponse>(environment.gateway + 'images', userInput)
      .subscribe({
        next: (res) => this.imageSubject.next(res),
        error: (err) => {
          this.errorService.errorSubject.next(err.error?.status);
          this.router.navigate(['error']);
        },
      });
  }

  /**
   * Sends a request again to the API for image generation based on user prompts.
   *
   * @param promptId - The id of the prompt.
   * @returns {Observable<ImageResponse>} - An observable containing the server's response, which includes generated images.
   */
  regenerateImage(promptId: string): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(
      environment.gateway + 'images/regenerate/' + promptId,
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
          this.errorService.errorSubject.next(err.error?.status);
          this.router.navigate(['error']);
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

    return new File([blob], filename, { type: blob.type });
  }
}
