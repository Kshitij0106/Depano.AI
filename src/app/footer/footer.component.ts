// import { Component } from '@angular/core';

// @Component({
//   standalone: true,
//   selector: 'app-footer',
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.css',
// })
// export class FooterComponent {}

import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
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
