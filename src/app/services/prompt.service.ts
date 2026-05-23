import { Injectable } from '@angular/core';

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

  setGender(gender: string) {
    this.gender = gender;
  }

  getGender(): string {
    return this.gender;
  }

  getPrompt() {
    return this.userPrompts;
  }

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

  /**
   * Empty the prompt map.
   * Clears the prompt stored in backend
   */
  emptyPrompt() {
    this.userPrompts = [];
  }
}
