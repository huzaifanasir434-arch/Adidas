import { map } from 'rxjs';
import { Router } from "@angular/router";
import { Component, OnInit} from '@angular/core';
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

  cartQty$: any;
  cartItems: CartItem[] = [];
  showCart = false;
  totalQty = 0;

  constructor(public cartService: CartService,
              private router: Router
  ) {}

  ngOnInit() {
    this.cartQty$ = this.cartService.cart$.pipe(
      map(c => c.reduce((sum, i) => sum + i.quantity, 0))
    );
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalQty = this.cartService.getTotalQuantity();
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  removeItem(index: number) {
    this.cartService.remove(index);
  }

  increase(i: number) {
  this.cartService.increase(i);
}

decrease(i: number) {
  this.cartService.decrease(i);
}

placeOrder() {
  this.cartService.placeOrder();
  this.showCart = false;
  this.router.navigate(['/orders']);
}

  openCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

}
