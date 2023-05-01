import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../generate/service/prompt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'Depano.AI';

  constructor(private router: Router, private prompt: PromptService) {}

  openCategory(category: string) {
    this.prompt.addToPrompt('gender', category);
    this.router.navigate(['generate', category]);
  }
}
