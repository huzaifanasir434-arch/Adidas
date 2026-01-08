import { Component, inject, EventEmitter, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { CategoriesComponent } from "../categories/categories";


@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  activeCategory: string | null = null;

 @Output() filterClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  selectCategory(category: string) {
    this.activeCategory = category;
    this.router.navigate(['/category', category]);
  }

    openFilter() {
    this.filterClicked.emit();
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

