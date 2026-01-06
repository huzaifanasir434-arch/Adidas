import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { Category } from "../category/category";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, Category],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})

export class CategoriesComponent implements OnInit {
  categoryName = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (!category) return;

      this.categoryName = category;

      this.productService.getProducts(category)
        .subscribe(products => this.products = products);
    });
  }

editProduct(product: Product) {
  // product.id is now a number, so no changes needed here
  this.router.navigate(['/edit-product', product.id]);
}

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}


// loadProducts(category: string) {
//   this.productService.getProducts(category)
//     .subscribe((data: Product[]) => {
//       this.products = data;
//     });
// }



// ngOnInit() {
//   this.route.paramMap.subscribe(params => {
//     const category = params.get('category');

//     if (category) {
//       this.categoryName = category;
//       this.loadProducts(category);
//     }
//   });
// }
