import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataUrl = '/assets/samba-products.json';


  constructor(private http: HttpClient) {}

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }
}
