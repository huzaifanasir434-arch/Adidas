import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';


@Injectable({ providedIn: 'root' })
export class CartService {

  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private emit() {
    this.cartSubject.next([...this.cart]);
  }

  addToCart(product: any, color: string, quantity: number) {
    const existing = this.cart.find(
      item => item.product.id === product.id && item.color === color
    );

    if (existing) {
      existing.quantity = quantity; // 🔥 LINKED
    } else {
      this.cart.push({ product, color, quantity });
    }

    this.emit();

  }

  increase(index: number) {
    this.cart[index].quantity++;
    this.emit();
  }

  decrease(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
    } else {
      this.cart.splice(index, 1);
    }
    this.emit();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.emit();
  }

  getTotalQuantity(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}




// @Injectable({ providedIn: 'root' })
// export class CartService {

//   private cart: CartItem[] = [];

//   private cartSubject = new BehaviorSubject<CartItem[]>([]);
//   cart$ = this.cartSubject.asObservable();

//   private emit() {
//     this.cartSubject.next([...this.cart]);
//   }

//   getCart() {
//     return this.cart;
//   }

//   addToCart(item: CartItem) {
//     const existing = this.cart.find(c =>
//       c.product.id === item.product.id &&
//       c.color === item.color
//     );

//     if (existing) {
//       existing.quantity += item.quantity;
//     } else {
//       this.cart.push(item);
//     }

//     this.emit();
//   }
