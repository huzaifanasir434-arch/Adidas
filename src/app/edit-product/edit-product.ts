import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css'],  // plural here!
})
export class EditProductComponent implements OnInit {
  product: Product | undefined;

  allColors: string[] = []

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe({
          next: (p) => {
            // clone to avoid mutating original
            this.product = {
              ...p,
              colors: [...p.colors]
            };

            // collect all unique colors from products
            this.productService.getAllProducts().subscribe(all => {
              this.allColors = this.getUniqueColors(all);
              this.cdr.detectChanges();
            });
          }
        });
      }
    });
  }

  // ✅ Toggle color selection

  toggleColor(color: string) {
    if (!this.product) return;

    const index = this.product.colors.indexOf(color);
    if (index > -1) {
      this.product.colors.splice(index, 1);
    } else {
      this.product.colors.push(color);
    }
  }

  isSelected(color: string): boolean {
   return !!this.product?.colors.includes(color);
  }

  getUniqueColors(products: Product[]): string[]{
    const set = new Set<string>();
    products.forEach( p => p.colors.forEach( c => set.add(c)));
    return Array.from(set);
  }

   save() {
  if (!this.product) return;

  this.productService.updateProduct(this.product).subscribe(() => {
    // alert('Product saved successfully!');

    // ✅ Navigate back to category of edited product
    this.router.navigate(['/category', this.product!.category]);
  });
}

}

  // save() {
  //   if (!this.product) return;

  //   this.productService.updateProduct(this.product).subscribe({
  //     next: updated => {
  //       console.log('Product saved:', updated);
  //       alert('Product saved successfully!');
  //     },
  //     error: err => {
  //       console.error('Save failed', err);
  //       alert('Failed to save product.');
  //     }
  //   });
  // }
// }




