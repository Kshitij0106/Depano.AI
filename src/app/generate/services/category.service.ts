import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PromptService } from 'src/app/services/prompt.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private promptService: PromptService,
  ) {}

  /**
   * Retrieves the selected gender from the prompt service.
   *
   * @returns {string} - The user's selected gender, or an empty string if not available.
   */
  private getGender(): string {
    return this.promptService.getGender();
  }

  /**
   * Retrieves category information, based on the specified category and subcategory type from the API.
   *
   * @param {string} category - The main category for which information is requested.
   * @returns {Observable<Category>} - An observable containing the category information.
   */
  public getCategory(category: string): Observable<Category> {
    return this.http
      .get<Category>(
        environment.gateway + 'categories/' + this.getGender() + '/' + category,
      )
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  /**
   * Saves value of the attributes selected by user.
   *
   * @param {string} category - The main category for which information is requested.
   * @returns {Observable<any>} - An observable containing the category information.
   */
  public saveAttributeValue(category: string): Observable<any> {
    return this.http.post(
      environment.gateway + 'categories/attributes/' + category,
      {},
    );
  }

  /**
   * Removes value of the attributes selected by user.
   *
   * @param {string} category - The main category for which information is requested.
   */
  public removeAttributeValue(category: string) {
    return this.http.delete(
      environment.gateway + 'categories/attributes/' + category,
    );
  }

  public deleteCategories() {
    this.http.delete(environment.gateway + 'categories').subscribe();
    this.promptService.emptyPrompt();
  }
}
