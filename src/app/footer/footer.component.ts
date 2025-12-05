import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [LucideAngularModule],
})
export class FooterComponent {
  @Input() onNavigate?: (section: string) => void;
  @Input() onStartDesigning?: () => void;
  @Input() onSignUp?: () => void;
  @Input() onSignIn?: () => void;

  handleSocialClick(platform: string): void {
    alert(`Opening ${platform}\nFollow us for the latest in AI fashion design`); // Simplified toast replacement
  }

  handleLinkClick(link: string): void {
    alert(
      `Navigating to ${link}\nThis would typically open the respective page`
    );
  }
}
