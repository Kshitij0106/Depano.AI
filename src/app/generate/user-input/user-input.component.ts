import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  imports: [CommonModule, FormsModule, LucideAngularModule],
})
export class UserInputComponent {
  @Input() hideUserPrompt!: boolean;
  @Input() label!: string;
  @Output() userInput = new EventEmitter<string>();
  userPrompt: string = '';

  constructor() {}

  /**
   * Handles the submission of user input.
   * @param {string} input - The user input to be emitted to category component.
   */
  onSubmit(input: string) {
    const userprompt = input?.trim().replace(/\s+/g, ' ');

    if (!userprompt) {
      return;
    }

    this.userInput.emit(userprompt);

    this.userPrompt = '';
  }
}
