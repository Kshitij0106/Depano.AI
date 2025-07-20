import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageResponse } from '../generate/models/imageResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { editImageResponse } from '../generate/models/editImageResponse';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http:HttpClient) { }
  private imageUrl: string = '';

  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  sendImageData(email: string, formData: FormData): Observable<editImageResponse> {
    return this.http.post<editImageResponse>(environment.gateway + 'edit/' + email,
          formData);
  }

  async prepareEditFormData(imageUrl: string, maskUrl: string, prompt: string): Promise<FormData> {
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


  // Convert byte array to Data URL
  convertByteArrayToDataUrl(bytes: number[]): string {
    const uint8Array = new Uint8Array(bytes);
    const blob = new Blob([uint8Array], { type: 'image/png' }); 
    return URL.createObjectURL(blob); 
  }


}
