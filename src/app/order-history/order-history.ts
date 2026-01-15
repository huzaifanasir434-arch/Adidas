import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

interface OrderItem {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  color: string;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  total: number;
  date: string; // stored as ISO string
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css'],
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
  const cartOrders = this.cartService.getOrderHistory();

  this.orders = cartOrders
    .map(order => ({
      ...order,
      date: order.date instanceof Date
        ? order.date.toISOString()
        : order.date
    }))
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    ); // 🔥 newest first
}

     goBack() {
    history.back();
  }
}
