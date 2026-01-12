import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {

  product!: Product;
  selectedColor!: string;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.productService.getProductById(id).subscribe(p => {
  //       this.product = p;
  //       this.selectedColor = p.colors[0]; // default
  //     });
  //   }
  // }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  // increaseQty() {
  //   this.quantity++;
  // }

  // decreaseQty() {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //   }
  // }

  // addToCart() {
  //   this.cartService.addToCart({
  //     product: this.product,
  //     color: this.selectedColor,
  //     quantity: this.quantity
  //   });

  //   alert('Product added to cart');
  // }

  goBack() {
    history.back();
  }

   ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(p => {
      this.product = p;
      this.selectedColor = p.colors[0];
    });
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
