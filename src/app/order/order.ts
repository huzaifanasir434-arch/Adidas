// import { Component } from '@angular/core';
// import { CartService } from '../services/cart.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-orders',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './order.html',
//   styleUrl: './order.css'
// })

// export class OrdersComponent {

//   orders: any[];

//   constructor(private cartService: CartService) {
//     this.orders = this.cartService.getOrders();
//   }

//   confirm() {
//     this.cartService.confirm();
//     alert('Order confirmed & saved!');
//   }
// }

// ..............................................................................................


import { Component } from '@angular/core';
import { CartService, Order } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css'] // fix plural typo
})
export class OrdersComponent {

  orders: Order[] = [];

  constructor(private cartService: CartService) {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.cartService.getOrders();
  }

  confirm() {
    this.cartService.confirm();
    alert('Orders confirmed & saved!');
    this.loadOrders();
  }

     goBack() {
    history.back();
  }

  removeItem(orderId: string, index: number) {
    this.cartService.removeItemFromOrder(orderId, index);
    this.loadOrders();
  }
}

