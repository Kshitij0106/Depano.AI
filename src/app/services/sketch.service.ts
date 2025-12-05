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
    return this.http.post<ImageResponse>(
      environment.gateway + 'sketch/image',
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
}
