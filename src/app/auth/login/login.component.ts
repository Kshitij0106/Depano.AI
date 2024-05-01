import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'DEPANO AI';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  /**
   * Navigates to homepage.
   * Empties the breadcrumb list.
   */
  openHome() {
    this.router.navigate(['home']);
  }

  validate() {
    console.log(this.email, this.password);
    this.router.navigate(['gender']);
  }
}
