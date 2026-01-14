import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ REQUIRED
import { Navbar } from './navbar/navbar';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,        // ✅ FIX FOR *ngIf
    Navbar,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('My-Adidas');

  message$!: Observable<string | null>; // ✅ declare only

  constructor(public cartService: CartService) {
    this.message$ = this.cartService.message$; 
  }
}
