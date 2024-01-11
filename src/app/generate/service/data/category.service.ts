import { Injectable } from '@angular/core';
import { Category } from '../../category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { PromptService } from '../prompt.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private promptService: PromptService) {}

  private getGender(): string {
    return this.promptService.getKey('gender');
  }

  public getCategory(category: string, subcategoryType: string) {
    let headers = new HttpHeaders();
    headers = headers.set('subcategoryType', subcategoryType);
    return this.http
      .get<Category>(environment.gateway + this.getGender() + '/' + category, {
        headers: headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
