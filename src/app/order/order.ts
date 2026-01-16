
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../services/toast.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css'] // fix plural typo
})
// export class OrdersComponent {

//   orders: Order[] = [];

//   constructor(
//     private auth: AuthService,
//     private toast: ToastService,
//     private cartService: CartService) {
//     this.loadOrders();
//   }

//   loadOrders() {
//     this.orders = this.cartService.getOrders();
//   }

//   confirm() {

//     if (!this.auth.isLoggedIn()) {
//       this.toast.show('Please login first to confirm order');
//       return;
//     }


//     this.cartService.confirm();

//     this.orders = [];
//   }

//      goBack() {
//     history.back();
//   }

//   removeItem(orderId: string, index: number) {
//     this.cartService.removeItemFromOrder(orderId, index);
//     this.loadOrders();
//   }
// }


//....................................................................//


export class OrdersComponent {

  order: Order | null = null;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.order = this.cartService.getPendingOrder();
  }

  removeItem(index: number) {
    this.cartService.removeItemFromPending(index);
    this.order = this.cartService.getPendingOrder();
  }

  confirm() {
    if (!this.auth.isLoggedIn()) {
      this.toast.show('Please login first to confirm order');
      return;
    }

    this.cartService.confirmOrder();
    this.router.navigate(['/order-history']);
  }

     goBack() {
    history.back();
  }

}
