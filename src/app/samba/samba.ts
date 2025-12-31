import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-samba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './samba.html',
  styleUrls: ['./samba.css']
})
export class Samba implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProductsByCategory('samba')
      .subscribe(data => {
        this.products = data.filter(p => p.category === 'samba');
      });
  }
}
