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

  onSubmit(input: string) {
    this.userInput.emit(input);
    this.userInputRef.nativeElement.value = '';
  }
}
