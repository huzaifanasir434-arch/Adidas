// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { Product } from '../models/product.model';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductById(id).subscribe({
          next: (p) => {
            this.product = { ...p };
            console.log('Loaded product:', this.product);
            this.cdr.detectChanges();  // force update
          },
          error: (err) => {
            console.error('Error loading product:', err);
            this.product = undefined;
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  save() {
    if (!this.product) return;

    this.productService.updateProduct(this.product).subscribe({
      next: updated => {
        console.log('Product saved:', updated);
        alert('Product saved successfully!');
      },
      error: err => {
        console.error('Save failed', err);
        alert('Failed to save product.');
      }
    });
  }
}




