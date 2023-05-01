import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Depano.ai';

  constructor(private router: Router) {}

  openHome() {
    this.router.navigate(['home']);
  }
}
