import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
// import { Samba } from "./samba/samba";
import { Category } from "./category/category";
import { Samba } from "./samba/samba";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Category, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My-Adidas');
}
