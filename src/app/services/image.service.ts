import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageResponse } from '../generate/models/imageResponse.model';
import { UserService } from 'src/app/services/user.service';

interface Prompt {
  category: string;
  input: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private gender: string = '';
  private userPrompts: Prompt[] = [];

  public imageUrl = new BehaviorSubject<string>('');
  public sketchUrl = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  /**
   * Adds a key-value pair to the user prompt map.
   * @param key - The key of the selected category.
   * @param value - The prompt of the selected category.
   */
  addToPrompt(key: string, userInput: string) {
    this.userPrompts.push({
      category: key,
      input: userInput,
    });
  }

  setGender(gender: string) {
    this.gender = gender;
  }

  getGender(): string {
    return this.gender;
  }

  setPromptId(promptId: string) {
    localStorage.setItem('promptId', promptId);
  }

  clearPromptId() {
    localStorage.removeItem('promptId');
  }

  /**
   * Sends a prompt to the API for image generation based on user prompts.
   *
   * @returns {Observable<ImageResponse>} - An observable containing the server's response, which includes generated images.
   */
  generateImage(): Observable<ImageResponse> {
    let userInput = this.getPrompt();
    return this.http.post<ImageResponse>(
      environment.gateway + 'images',
      userInput
    );
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
      {}
    );
  }

  editImage(formData: FormData): Observable<ImageResponse> {
    return this.http.put<ImageResponse>(
      environment.gateway + 'images',
      formData
    );
  }

  async prepareEditFormData(
    imageUrl: string,
    maskUrl: string,
    prompt: string
  ): Promise<FormData> {
    const formData = new FormData();

    try {
      const imageBlob = await this.fetchBlobFromUrl(imageUrl);
      const maskBlob = await this.fetchBlobFromUrl(maskUrl);

      formData.append('image', imageBlob, 'image.png');
      formData.append('mask', maskBlob, 'mask.png');
      formData.append('prompt', prompt);

      return formData;
    } catch (err) {
      console.error('Error fetching blobs:', err);
      throw err;
    }
  }

  private async fetchBlobFromUrl(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return await response.blob();
  }

  sketchToImage(formData: FormData): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(
      environment.gateway + 'images/sketch',
      formData
    );
  }

  async prepareSketchFormData(sketch: File, prompt: string): Promise<FormData> {
    const formData = new FormData();

    try {
      formData.append('sketch', sketch, 'sketch.png');
      formData.append('prompt', prompt);

      return formData;
    } catch (err) {
      console.error('Error fetching blobs:', err);
      throw err;
    }
  }

  /**
   * Empty the prompt map.
   * Clears the prompt stored in backend
   */
  emptyPrompt() {
    this.userPrompts = [];
    this.http.delete(environment.gateway + 'categories').subscribe();
  }

  public getPrompt() {
    return this.userPrompts;
  }
}
