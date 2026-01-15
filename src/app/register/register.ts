import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  email = '';
  password = '';
  error = '';
  success = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    const ok = this.auth.register(this.email, this.password);

    if (!ok) {
      this.error = 'User already exists';
      return;
    }

    this.success = 'Account created successfully';
    setTimeout(() => this.router.navigate(['/login']), 1200);
  }
}
