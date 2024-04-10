import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface Prompt {
  category: string;
  input: string;
}

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private userPrompt = new Map();
  private prompts: Prompt[] = [];
  private mandatoryPrompt = [
    'Photorealistic image',
    'model',
    'in a fashion photoshoot with studio lighting ambient Lighting',
  ];

  constructor(private http: HttpClient) {}

  /**
   * Adds a key-value pair to the user prompt map.
   * @param key - The key of the selected category.
   * @param value - The prompt of the selected category.
   */
  addToPrompt(key: string, value: string) {
    this.userPrompt.set(key, value);
    this.prompts.push({
      category: key,
      input: value,
    });
  }

  /**
   * A getter that retrieves the key if available in the prompt map.
   * @param key - The key of the selected category.
   */
  getKey(key: string): string {
    if (this.userPrompt.has(key)) {
      return this.userPrompt.get(key);
    } else {
      return '';
    }
  }

  /**
   * A getter that retrieves the value of the key if available in the prompt map.
   * @param key - The key of the selected category.
   */
  getValue(key: string) {
    return this.userPrompt.get(key);
  }

  /**
   * Sends a prompt to the API for image generation based on user prompts.
   *
   * @returns {Observable<any>} - An observable containing the server's response, which includes generated images.
   */
  sendPrompt(): Observable<any> {
    let userInput = this.getPrompt();
    return this.http.post<any>(
      environment.gateway + 'prompts/create/' + this.getValue('gender'),
      userInput
    );
    // return this.http.post<Response>(environment.gateway + 'generate', body);
  }

  /**
   * Constructs a prompt string for image generation based on user-selected preferences.
   *
   * @returns {string} - The generated prompt string.
   */
  private makePrompt(): string {
    return (
      this.mandatoryPrompt[0] +
      ',' +
      this.getKey('gender') +
      ' ' +
      this.mandatoryPrompt[1] +
      ' ' +
      this.getKey('wear') +
      ',' +
      this.getKey('style') +
      ',' +
      this.getKey('fit-type') +
      ',' +
      this.getKey('color') +
      ',' +
      this.getKey('type') +
      ',' +
      this.mandatoryPrompt[2] +
      ',' +
      this.getKey('fabric') +
      ',' +
      this.getKey('pattern') +
      ',' +
      this.getKey('user-optional-input') +
      ',' +
      this.getKey('user-input')
    );
  }

  public getPrompt() {
    return this.prompts;
  }

  /**
   * Empty the prompt map.
   */
  emptyPrompt() {
    this.userPrompt.clear();
    this.prompts = [];
  }

  showPrompt() {
    console.log(this.userPrompt);
  }
}
