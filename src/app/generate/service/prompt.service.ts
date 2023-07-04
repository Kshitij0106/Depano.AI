import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private url = 'http://127.0.0.1:5000/generate';
  private userPrompt = new Map();
  private mandatoryPrompt = [
    'Photorealistic image',
    'model',
    'in a fashion photoshoot with studio lighting ambient Lighting',
  ];

  constructor(private http: HttpClient) {}

  addToPrompt(key: string, value: string) {
    this.userPrompt.set(key, value);
  }

  getKey(key: string): string {
    if (this.userPrompt.has(key)) {
      return this.userPrompt.get(key);
    } else {
      return '';
    }
  }

  sendPrompt() {
    let prompt = this.makePrompt();
    console.log(prompt);
    const body = { prompt: prompt };
    return this.http.post<any>(this.url, body);
  }

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

  emptyPrompt() {
    this.userPrompt.clear();
  }

  showPrompt() {
    console.log(this.userPrompt);
  }
}
