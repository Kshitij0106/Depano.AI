import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mode-select',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
  templateUrl: './mode-select.component.html',
  styleUrl: './mode-select.component.css',
})
export class ModeSelectComponent implements OnInit, OnDestroy {
  selectedCategory: string = '';
  private navigationSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onBackButton();
  }

  handleCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.router.navigate([category]);
  }

  onBackButton() {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
