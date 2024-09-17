import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  @Input() hideUserPrompt!: boolean;
  @Input() categoryName!: string;
  @Output() userInput = new EventEmitter<string>();
  @ViewChild('userInputCategory') userInputRef!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

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
