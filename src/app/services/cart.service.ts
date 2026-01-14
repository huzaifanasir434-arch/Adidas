// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// export interface CartItem {
//   product: any;
//   color: string;
//   quantity: number;
// }

// export interface Order {
//   items: CartItem[];
//   total: number;
//   date: Date;
// }

// @Injectable({ providedIn: 'root' })
// export class CartService {
//   confirm() {
//     throw new Error('Method not implemented.');
//   }

//   private cart: CartItem[] = [];
//   private orders: Order[] = [];

//   private cartSubject = new BehaviorSubject<CartItem[]>([]);
//   cart$ = this.cartSubject.asObservable();

//   private messageSubject = new BehaviorSubject<string | null>(null);
//   message$ = this.messageSubject.asObservable();

//   private emit() {
//     this.cartSubject.next([...this.cart]);
//   }


//   addToCart(product: any, color: string, quantity: number) {
//     const existing = this.cart.find(
//       item => item.product.id === product.id && item.color === color
//     );

//     if (existing) {
//       existing.quantity = quantity; // 🔥 REPLACE
//       this.showMessage('Cart updated');
//     } else {
//       this.cart.push({ product, color, quantity });
//       this.showMessage('Added to cart');
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

//   remove(index: number) {
//     this.cart.splice(index, 1);
//     this.emit();
//   }

//   clearCart() {
//     this.cart = [];
//     this.emit();
//   }

//   getTotalQuantity() {
//     return this.cart.reduce((sum, i) => sum + i.quantity, 0);
//   }

//   getTotalPrice() {
//     return this.cart.reduce(
//       (sum, i) => sum + i.product.price * i.quantity,
//       0
//     );
//   }


//   placeOrder() {
//     const order: Order = {
//       items: [...this.cart],
//       total: this.getTotalPrice(),
//       date: new Date()
//     };

//     this.orders.push(order);
//     this.clearCart();
//   }

//   getOrders() {
//     return this.orders;
//   }


//   showMessage(msg: string) {
//     this.messageSubject.next(msg);
//     setTimeout(() => this.messageSubject.next(null), 2000);
//   }
// }


// .................................................


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any;
  color: string;
  quantity: number;
}

export interface Order {
  id: string; // unique id for order
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

  private readonly ordersKey = 'orders_storage';

  constructor() {
    this.loadOrdersFromStorage();
  }

  private emit() {
    this.cartSubject.next([...this.cart]);
  }

  addToCart(product: any, color: string, quantity: number) {
    const existing = this.cart.find(
      item => item.product.id === product.id && item.color === color
    );

    if (existing) {
      existing.quantity = quantity;
      this.showMessage('Cart updated');
    } else {
      this.cart.push({ product, color, quantity });
      this.showMessage('Added to cart');
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

  remove(index: number) {
    this.cart.splice(index, 1);
    this.emit();
  }

  clearCart() {
    this.cart = [];
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

  // ORDERS STORAGE

  private loadOrdersFromStorage() {
    const saved = localStorage.getItem(this.ordersKey);
    if (saved) {
      this.orders = JSON.parse(saved).map((o: any) => ({
        ...o,
        date: new Date(o.date),
      }));
    }
  }

  private saveOrdersToStorage() {
    localStorage.setItem(this.ordersKey, JSON.stringify(this.orders));
  }

  getOrders(): Order[] {
    return this.orders;
  }

  placeOrder() {
    if (this.cart.length === 0) {
      this.showMessage('Cart is empty');
      return;
    }

    const order: Order = {
      id: this.generateId(),
      items: [...this.cart],
      total: this.getTotalPrice(),
      date: new Date()
    };

    this.orders.push(order);
    this.saveOrdersToStorage();

    this.clearCart();
    this.showMessage('Order placed successfully');
  }

  // Remove item from order by orderId and item index
  removeItemFromOrder(orderId: string, itemIndex: number) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;
    order.items.splice(itemIndex, 1);
    // Recalculate total
    order.total = order.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    if (order.items.length === 0) {
      // If no items left, remove order
      this.orders = this.orders.filter(o => o.id !== orderId);
    }
    this.saveOrdersToStorage();
  }

  // Confirm saves orders to localStorage (already done in placeOrder)
  confirm() {
    this.saveOrdersToStorage();
  }

  private showMessage(msg: string) {
    this.messageSubject.next(msg);
    setTimeout(() => this.messageSubject.next(null), 2000);
  }

  private generateId() {
    // simple unique id generator
    return Math.random().toString(36).substring(2, 15);
  }
}
