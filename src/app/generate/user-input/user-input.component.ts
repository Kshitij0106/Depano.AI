import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {
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
