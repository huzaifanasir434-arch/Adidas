import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// import { CategoriesComponent } from "../categories/categories";


@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  activeCategory: string | null = null;

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.activeCategory = category;
    this.router.navigate(['/category', category]);
  }
}

    // wait for DOM render then scroll
  //   setTimeout(() => {
  //     const el = document.getElementById(category);
  //     if (el) {
  //       el.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start'
  //       });
  //     }
  //   }, 50);
  //   };
  // }

