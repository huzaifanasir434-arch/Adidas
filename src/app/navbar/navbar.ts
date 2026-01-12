import { RouterLink } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  cartItems: CartItem[] = [];
  showCart = false;
  totalQty = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalQty = this.cartService.getTotalQuantity();
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  increase(i: number) {
  this.cartService.increase(i);
}

decrease(i: number) {
  this.cartService.decrease(i);
}

}
