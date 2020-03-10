import { Injectable } from '@angular/core';
import { Product } from '../_interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { shareReplay, flatMap, first } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  private product$: Observable<Product[]>;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (!this.product$) {
      this.product$ = this.http.get<Product[]>(this.baseUrl + 'products/getAllProducts').pipe(shareReplay());
    }

    return this.product$;
  }

  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(flatMap(result => result), first(product => product.id === id));
  }

  createProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products/createProducts', newProduct, httpOptions);
  }

  updateProduct(id: number, editedProduct: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + 'products/editProduct/' + id, editedProduct);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + 'products/deleteProduct/' + id);
  }

  clearCache() {
    this.product$ = null;
  }

}
