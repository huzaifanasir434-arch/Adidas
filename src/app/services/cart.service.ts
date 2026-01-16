import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  getTotalQuantity(): number {
     return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  private cart: CartItem[] = [];
  private pendingOrder: Order | null = null;
  private orderHistory: Order[] = [];

  // private readonly ordersKey = 'orders_storage';

  private getUserOrdersKey(): string | null {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  return user ? `orders_${user.email}` : null;
}

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  private getOrdersKey(): string | null {
  const user = this.auth.getCurrentUser();
  return user ? `orders_${user.email}` : null;
}

  constructor(private auth: AuthService) {
    this.loadHistory();
    this.syncUserOrders();
  }

  //==================SYNCUSER===============

  getOrderHistory(): Order[] {
  this.syncUserOrders(); // 🔥 ALWAYS load correct user
  return [...this.orderHistory];
}

  private syncUserOrders() {
  const key = this.getOrdersKey();

  if (!key) {
    this.orderHistory = [];
    return;
  }

  const saved = localStorage.getItem(key);
  this.orderHistory = saved
    ? JSON.parse(saved).map((o: any) => ({
        ...o,
        date: new Date(o.date)
      }))
    : [];
}

private saveHistory() {
  const key = this.getOrdersKey();
  if (!key) return;

  localStorage.setItem(key, JSON.stringify(this.orderHistory));
}

  // ================= CART =================

  private emit() {
    this.cartSubject.next([...this.cart]);
  }

  addToCart(product: any, color: string, quantity: number) {
    const existing = this.cart.find(
      i => i.product.id === product.id && i.color === color
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

  increase(i: number) {
    this.cart[i].quantity++;
    this.emit();
  }

  decrease(i: number) {
    if (this.cart[i].quantity > 1) {
      this.cart[i].quantity--;
    } else {
      this.cart.splice(i, 1);
    }
    this.emit();
  }

  remove(i: number) {
    this.cart.splice(i, 1);
    this.emit();
  }

  clearCart() {
    this.cart = [];
    this.emit();
  }

  getTotalPrice() {
    return this.cart.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
  }

  // ================= ORDER FLOW =================

  /** Called when user clicks "Order" from cart */
  
  createPendingOrder() {
    if (this.cart.length === 0) return;

    this.pendingOrder = {
      id: this.generateId(),
      items: JSON.parse(JSON.stringify(this.cart)),
      total: this.getTotalPrice(),
      date: new Date()
    };

     // ✅ CLEAR CART IMMEDIATELY

  this.clearCart();
  }

  getPendingOrder(): Order | null {
    return this.pendingOrder;
  }

  removeItemFromPending(index: number) {
    if (!this.pendingOrder) return;

    this.pendingOrder.items.splice(index, 1);
    this.pendingOrder.total = this.pendingOrder.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    if (this.pendingOrder.items.length === 0) {
      this.pendingOrder = null;
    }
  }

  /** CONFIRM = move to history */
  confirmOrder() {
    if (!this.pendingOrder) return;

    this.orderHistory.push(this.pendingOrder);
    this.saveHistory();

    this.pendingOrder = null;
    this.clearCart();
    this.showMessage('Order confirmed');
  }

  // ================= HISTORY =================

  // getOrderHistory(): Order[] {
  //   return this.orderHistory;
  // }

  private loadHistory() {
  const key = this.getUserOrdersKey();
  if (!key) {
    this.orderHistory = [];
    return;
  }

  const saved = localStorage.getItem(key);
  if (saved) {
    this.orderHistory = JSON.parse(saved).map((o: any) => ({
      ...o,
      date: new Date(o.date)
    }));
  } else {
    this.orderHistory = [];
  }
}

  // private loadHistory() {
  //   const saved = localStorage.getItem(this.ordersKey);
  //   if (saved) {
  //     this.orderHistory = JSON.parse(saved).map((o: any) => ({
  //       ...o,
  //       date: new Date(o.date)
  //     }));
  //   }
  // }

  // private saveHistory() {
  //   localStorage.setItem(this.ordersKey, JSON.stringify(this.orderHistory));
  // }

//   private saveHistory() {
//   const key = this.getUserOrdersKey();
//   if (!key) return;

//   localStorage.setItem(key, JSON.stringify(this.orderHistory));
// }

  // ================= HELPERS =================

  private showMessage(msg: string) {
    this.messageSubject.next(msg);
    setTimeout(() => this.messageSubject.next(null), 2000);
  }

  private generateId() {
    return Math.random().toString(36).substring(2, 10);
  }

  resetUserData() {
  this.orderHistory = [];
  this.pendingOrder = null;
}
}




// .................................................................................................


// export interface CartItem {
//   product: any;
//   color: string;
//   quantity: number;
// }

// export interface Order {
//   id: number;
//   items: CartItem[];
//   total: number;
//   date: Date;
// }

// @Injectable({ providedIn: 'root' })
// export class CartService {

//   private cart: CartItem[] = [];
//   private orders: Order[] = [];

//   private cartSubject = new BehaviorSubject<CartItem[]>([]);
//   cart$ = this.cartSubject.asObservable();

//   private messageSubject = new BehaviorSubject<string | null>(null);
//   message$ = this.messageSubject.asObservable();

//   private readonly ordersKey = 'orders_storage';

//   constructor() {
//     this.loadOrdersFromStorage();
//   }

//   private emit() {
//     this.cartSubject.next([...this.cart]);
//   }

//   addToCart(product: any, color: string, quantity: number) {
//     const existing = this.cart.find(
//       item => item.product.id === product.id && item.color === color
//     );

//     if (existing) {
//       existing.quantity = quantity;
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

//    getCart() {
//     return this.cart;
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



//   private loadOrdersFromStorage() {
//     const saved = localStorage.getItem(this.ordersKey);
//     if (saved) {
//       this.orders = JSON.parse(saved).map((o: any) => ({
//         ...o,
//         date: new Date(o.date),
//       }));
//     }
//   }

//   private saveOrdersToStorage() {
//     localStorage.setItem(this.ordersKey, JSON.stringify(this.orders));
//   }

//   getOrders(): Order[] {
//     return this.orders;
//   }

//   placeOrder() {
//     if (this.cart.length === 0) {
//       this.showMessage('Cart is empty');
//       return;
//     }

//     const order: Order = {
//       id: this.generateId(),
//       items: [...this.cart],
//       total: this.getTotalPrice(),
//       date: new Date()
//     };

//     this.orders.push(order);
//     this.saveOrdersToStorage();

//     this.clearCart();
//     this.showMessage('Order placed successfully');
//   }


//   removeItemFromOrder(orderId: string, itemIndex: number) {
//     const order = this.orders.find(o => o.id === orderId);
//     if (!order) return;
//     order.items.splice(itemIndex, 1);

//     order.total = order.items.reduce(
//       (sum, i) => sum + i.product.price * i.quantity,
//       0
//     );
//     if (order.items.length === 0) {

//       this.orders = this.orders.filter(o => o.id !== orderId);
//     }
//     this.saveOrdersToStorage();
//   }



//   confirm() {
//   if (this.orders.length === 0) return;

//   this.saveOrdersToStorage();

//   this.clearCart();
//   this.showMessage('Order confirmed successfully');
// }

//   private showMessage(msg: string) {
//     this.messageSubject.next(msg);
//     setTimeout(() => this.messageSubject.next(null), 2000);
//   }

//   private generateId() {

//     return Math.random().toString(36).substring(2, 15);
//   }
// }


// .......................................................................
