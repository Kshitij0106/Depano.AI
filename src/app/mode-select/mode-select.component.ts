import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-mode-select',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './mode-select.component.html',
  styleUrl: './mode-select.component.css',
})
export class ModeSelectComponent {
  constructor(private router: Router) {}
  selectedCategory: string = '';

  handleCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.router.navigate([category]);
  }
}
