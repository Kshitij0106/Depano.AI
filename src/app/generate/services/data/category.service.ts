import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PromptService } from '../prompt.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private promptService: PromptService) {}

  /**
   * Retrieves the selected gender from the prompt service.
   *
   * @returns {string} - The user's selected gender, or an empty string if not available.
   */
  private getGender(): string {
    return this.promptService.getKey('gender');
  }

  /**
   * Retrieves category information, based on the specified category and subcategory type from the API.
   *
   * @param {string} category - The main category for which information is requested.
   * @returns {Observable<Category>} - An observable containing the category information.
   */
  public getCategory(category: string): Observable<Category> {
    return this.http
      .get<Category>(environment.gateway + this.getGender() + '/' + category)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getAttribute(category: string): Observable<any> {
    return this.http.get(
      environment.gateway +
        this.getGender() +
        '/' +
        'attributes' +
        '/' +
        category
    );
  }
}
