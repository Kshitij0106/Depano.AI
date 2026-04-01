import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('userInputCategory') userInputRef!: ElementRef;

  constructor() {}

  /**
   * Handles the submission of user input.
   * @emits {string} input - User's input in the textbox.
   * @param {string} input - The user input to be emitted to category component.
   */
  onSubmit(input: string) {
    this.userInput.emit(input);
    // Clear the input field
    this.userInputRef.nativeElement.value = '';
  }
}
