import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})

export class Category {

  activeCategory: string | null = null;

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.activeCategory = category;

    // Navigate to category route
    this.router.navigate([`/${category}`]).then(() => {

    // wait for DOM render then scroll
    // setTimeout(() => {
    //   const el = document.getElementById(category);
    //   if (el) {
    //     el.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'start'
    //     });
    //   }
    // }, 50);
    });
  }
}
