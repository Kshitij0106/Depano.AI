import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { PromptService } from '../services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [LucideAngularModule],
})
export class FooterComponent {
  constructor(
    private router: Router,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
  ) {}

  onNavigate(location: string) {
    this.router.navigate([location]);
  }

  onNavigateToCategory(category: string) {
    this.breadcrumbService.addBreadcrumb(category.toLowerCase(), category);
    this.promptService.setGender(category.toLowerCase());
    this.router.navigate(['generate', category.toLowerCase()]);
  }

  scrollToHomePageSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
