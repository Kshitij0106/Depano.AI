import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageResponse } from '../generate/models/imageResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http:HttpClient) { }
  private imageUrl: string = '';
  private backendUrl = 'https://your-backend-endpoint.com/api/edit'; 

  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  sendImageData(email: string, formData: FormData): Observable<ImageResponse> {
    return this.http.post<ImageResponse>(environment.gateway + 'edit/' + email,
          formData);
  }

  
}
