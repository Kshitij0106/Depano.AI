import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ImageResponse } from '../models/imageResponse';

interface Prompt {
  category: string;
  input: string;
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private gender: string = '';
  private userPrompts: Prompt[] = [];

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

  /**
   * Sends a prompt to the API for image generation based on user prompts.
   *
   * @returns {Observable<any>} - An observable containing the server's response, which includes generated images.
   */
  sendPrompt(email: string): Observable<ImageResponse> {
    let userInput = this.getPrompt();
    return this.http.post<ImageResponse>(
      environment.gateway + 'prompts/create/' + this.getGender() + '/' + email,
      userInput
    );
  }

  regenerate(email: string): Observable<ImageResponse> {
    return this.http.get<ImageResponse>(
      environment.gateway + 'prompts/regenerate/' + email
    );
  }

  public getPrompt() {
    return this.userPrompts;
  }

  /**
   * Empty the prompt map.
   * Clears the prompt stored in backend
   */
  emptyPrompt() {
    this.userPrompts = [];
    this.http
      .get(environment.gateway + this.getGender() + '/' + 'refresh')
      .subscribe();
  }
}
