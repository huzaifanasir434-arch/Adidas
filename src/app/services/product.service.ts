import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError, of} from 'rxjs';
import { Product } from '../models/product.model';
import { tap } from 'rxjs/operators'; // add tap here

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productsLoaded = false;

  private url = '/assets/samba-products.json';

  constructor(private http: HttpClient) {}

  private loadProducts(): Observable<Product[]> {
    if (this.productsLoaded) {
      return of(this.products);
    }

    return this.http.get<Product[]>(this.url).pipe(
      tap((data: Product[]) => {  // <-- add explicit type here
        this.products = data;
        this.productsLoaded = true;
      })
    );
  }

  getProducts(category: string): Observable<Product[]> {
    return this.loadProducts().pipe(
      map(products => products.filter(p => p.category === category))
    );
  }

  getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.url);
}

  getProductById(id: number | string): Observable<Product> {
    return this.loadProducts().pipe(
      map(products => {
        const product = products.find(p => p.id.toString() === id.toString());
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      })
    );
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) {
      return throwError(() => new Error('Product not found'));
    }
    this.products[index] = updatedProduct;
    return of(updatedProduct);
  }
}




