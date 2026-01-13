import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, BreadcrumbComponent],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {

category: string | null = null;
productName: string | null = null;

  // category!: string;
  // productName!: string;
  product!: Product;
  selectedColor!: string;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  selectColor(color: string) {
    this.selectedColor = color;
  }

  goBack() {
    history.back();
  }

  //  ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id')!;
  //   this.productService.getProductById(id).subscribe(p => {
  //     this.product = p;
  //     this.selectedColor = p.colors[0];
  //   });
  // }

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.productService.getProductById(id).subscribe(p => {
      this.product = p;
      this.category = p.category;
      this.productName = p.name;
      this.selectedColor = p.colors[0];
    });
  }
}

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    this.cartService.addToCart(
      this.product,
      this.selectedColor,
      this.quantity
    );
  }

  }


