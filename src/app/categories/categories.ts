import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { Category } from "../category/category";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, Category, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})


export class CategoriesComponent implements OnInit {
  categoryName = '';
  products: Product[] = [];
  allProducts: Product[] = [];
  uniqueColors: string[] = [];
  selectedColors: string[] = [];


  showFilter = false;

  // FILTER STATE
  searchText = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minColors: number | null = null;
  gender = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }


  ngOnInit() {
    // 1. Fetch all products once for global filtering
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts = products;
      this.applyCurrentCategoryFilter(); // Show products for initial category if any

      this.uniqueColors = this.getUniqueColors(products);
    });

    // 2. Listen to category changes and update displayed products accordingly
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.categoryName = category;
        this.applyCurrentCategoryFilter();
      }
    });
  }

  // Helper to get unique colors
  getUniqueColors(products: Product[]): string[] {
    const colorsSet = new Set<string>();
    products.forEach(product => {
      product.colors.forEach(color => colorsSet.add(color));
    });
    return Array.from(colorsSet);
  }

  toggleColorSelection(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      // already selected, remove it
      this.selectedColors.splice(index, 1);
    } else {
      // add to selection
      this.selectedColors.push(color);
    }
    this.applyFilters();
  }

  // Apply category filtering only (no filter inputs)
  applyCurrentCategoryFilter() {
    this.products = this.allProducts.filter(p => p.category === this.categoryName);
  }

  // FILTER LOGIC

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilters() {
    // If any filter input is used, filter globally ignoring category
    const anyFilterUsed =
      this.searchText.trim() !== '' ||
      this.minPrice !== null ||
      this.maxPrice !== null ||
      this.minColors !== null ||
      this.gender !== '' ||
    this.selectedColors.length > 0; // ⭐ THIS WAS MISSING

    if (anyFilterUsed) {
      this.products = this.allProducts.filter(p => {
        if (
          this.searchText &&
          !p.name.toLowerCase().includes(this.searchText.toLowerCase())
        ) return false;

        if (this.minPrice !== null && p.price < this.minPrice) return false;
        if (this.maxPrice !== null && p.price > this.maxPrice) return false;
        if (this.minColors !== null && p.colors.length < this.minColors) return false;
        if (this.gender && p.gender !== this.gender) return false;

      // ✅ COLOR FILTER
      if (this.selectedColors.length > 0) {
        const hasColor = this.selectedColors.some(color =>
          p.colors.includes(color)
        );
        if (!hasColor) return false;
      }

        return true;
      });

    } else {
      // No filter input: revert to category-based filtering
      this.applyCurrentCategoryFilter();
    }
  }

  resetFilters() {
    this.searchText = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minColors = null;
    this.gender = '';
    this.selectedColors = [];
    this.applyCurrentCategoryFilter();
  }

  // ................filter ..................................

  openMenuProductId: number | null = null;

  toggleMenu(event: MouseEvent, productId: number) {
    event.stopPropagation();

    this.openMenuProductId =
      this.openMenuProductId === productId ? null : productId;
  }

  closeMenu() {
    this.openMenuProductId = null;
  }

  // already existing logic
  onEdit(product: Product) {
    // product.id is now a number, so no changes needed here
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
}

// editProduct(product: Product) {
//   this.router.navigate(['/edit-product', product.id]);
// }

//   deleteProduct(id: number) {
//     this.products = this.products.filter(p => p.id !== id);
//   }
// }


// ngOnInit() {
//   this.route.paramMap.subscribe(params => {
//     const category = params.get('category');
//     if (!category) return;

//     this.categoryName = category;

//     this.productService.getProducts(category)
//       .subscribe(products => this.products = products);
//   });
// }
