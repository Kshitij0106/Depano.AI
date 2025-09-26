import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageResponse } from '../generate/models/imageResponse.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  public imageUrl = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private userService: UserService) {}

  editImage(formData: FormData): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(
      environment.gateway + 'edit/' + this.userService.getUserId(),
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
}
