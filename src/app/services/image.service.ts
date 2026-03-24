import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageResponse } from '../generate/models/imageResponse.model';
import { PromptService } from './prompt.service';

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
  ) {}

  generateImage() {
    this.prepareRequest();
    let userInput = this.promptService.getPrompt();
    this.http
      .post<ImageResponse>(environment.gateway + 'images', userInput)
      .subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err),
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

  // async prepareEditFormData(
  //   imageUrl: string,
  //   prompt: string,
  // ): Promise<FormData> {
  //   const formData = new FormData();

  //   try {
  //     const imageBlob = await this.fetchBlobFromUrl(imageUrl);

  //     formData.append('image', imageBlob, 'image.png');
  //     formData.append('prompt', prompt);

  //     return formData;
  //   } catch (err) {
  //     console.error('Error fetching blobs:', err);
  //     throw err;
  //   }
  // }

  sketchToImage(formData: FormData) {
    this.http
      .post<ImageResponse>(environment.gateway + 'images/sketch', formData)
      .subscribe({
        next: (res) => this.handleSuccess(res),
        error: (err) => this.handleError(err),
      });
  }

  // async prepareSketchFormData(sketch: File, prompt: string): Promise<FormData> {
  //   const formData = new FormData();

  //   try {
  //     formData.append('sketch', sketch, 'sketch.png');
  //     formData.append('prompt', prompt);

  //     return formData;
  //   } catch (err) {
  //     console.error('Error fetching blobs:', err);
  //     throw err;
  //   }
  // }

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

  private prepareRequest() {
    this.imageSubject.next(null);
  }

  private handleSuccess(res: ImageResponse) {
    this.imageSubject.next(res);
  }

  private handleError(err: any) {}
}
