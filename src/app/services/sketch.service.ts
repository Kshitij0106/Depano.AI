import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageResponse } from '../generate/models/imageResponse.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SketchService {
  public sketchUrl = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  sketchToImage(formData: FormData): Observable<ImageResponse> {
    return this.http.put<ImageResponse>(
      environment.gateway + 'sketch/image',
      formData
    );
  }

  async prepareEditFormData(sketch: string, prompt: string): Promise<FormData> {
    const formData = new FormData();

    try {
      const sketchBlob = await this.fetchBlobFromUrl(sketch);

      formData.append('image', sketchBlob, 'sketch.png');
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
}
