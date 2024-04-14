import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'Depano.ai';

  constructor(private router: Router) {}

  validate() {
    this.router.navigate(['gender']);
  }
}
