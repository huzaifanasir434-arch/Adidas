// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { CartItem } from '../models/cart-item.model';


// @Injectable({ providedIn: 'root' })
// export class CartService {

//   private cart: CartItem[] = [];
//   private cartSubject = new BehaviorSubject<CartItem[]>([]);
//   cart$ = this.cartSubject.asObservable();

//   private emit() {
//     this.cartSubject.next([...this.cart]);
//   }

//   addToCart(product: any, color: string, quantity: number) {
//     const existing = this.cart.find(
//       item => item.product.id === product.id && item.color === color
//     );

//     if (existing) {
//       existing.quantity = quantity; // 🔥 LINKED
//     } else {
//       this.cart.push({ product, color, quantity });
//     }

//     this.emit();

//   }

//   increase(index: number) {
//     this.cart[index].quantity++;
//     this.emit();
//   }

//   decrease(index: number) {
//     if (this.cart[index].quantity > 1) {
//       this.cart[index].quantity--;
//     } else {
//       this.cart.splice(index, 1);
//     }
//     this.emit();
//   }

//   removeFromCart(index: number) {
//     this.cart.splice(index, 1);
//     this.emit();
//   }

//   getTotalQuantity(): number {
//     return this.cart.reduce((sum, item) => sum + item.quantity, 0);
//   }
// }



// ..........................................................................




import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any;
  color: string;
  quantity: number;
}

export interface Order {
  items: CartItem[];
  total: number;
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private cart: CartItem[] = [];
  private orders: Order[] = [];

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  private emit() {
    this.cartSubject.next([...this.cart]);
  }

  // ✅ ADD / UPDATE CART
  addToCart(product: any, color: string, quantity: number) {
    const existing = this.cart.find(
      item => item.product.id === product.id && item.color === color
    );

    if (existing) {
      existing.quantity = quantity; // 🔥 REPLACE
      this.showMessage('Cart updated');
    } else {
      this.cart.push({ product, color, quantity });
      this.showMessage('Added to cart');
    }

    this.emit();
  }

  // CART CONTROLS
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

  remove(index: number) {
    this.cart.splice(index, 1);
    this.emit();
  }

  clearCart() {
    this.cart = [];
    this.emit();
  }

    removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.emit();
  }

  getTotalQuantity() {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
  }

  // ✅ ORDER LOGIC
  placeOrder() {
    const order: Order = {
      items: [...this.cart],
      total: this.getTotalPrice(),
      date: new Date()
    };

    this.orders.push(order);
    this.clearCart();
  }

  getOrders() {
    return this.orders;
  }

  // MESSAGE
  showMessage(msg: string) {
    this.messageSubject.next(msg);
    setTimeout(() => this.messageSubject.next(null), 2000);
  }
}
