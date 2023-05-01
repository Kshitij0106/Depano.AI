import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  private url = 'http://127.0.0.1:5000/generate';
  private userPrompt = new Map();

  constructor(private http: HttpClient) {}

  addToPrompt(key: string, value: string) {
    this.userPrompt.set(key, value);
  }

  getKey(key: string): string {
    return this.userPrompt.get(key);
  }

  sendPrompt(prompt: string) {
    const body = { prompt: prompt };
    return this.http.post<any>(this.url, body);
  }
}
