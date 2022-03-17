import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  entity: string = 'products'

  constructor(private http: HttpClient) {

   }

   getAll(): Observable<Product[]> {
     return this.http.get<Product[]>(`${environment.apiUrl}${this.entity}`)
   }

   get(id: number): Observable<Product> {
     return this.http.get<Product>(`${environment.apiUrl}${this.entity}/${id}`)
   }

   create(product: Product): Observable<Product> {
     return this.http.post<Product>(`${environment.apiUrl}${this.entity}`, product)
   }

   update(product: Product): Observable<Product> {
     return this.http.patch<Product>(`${environment.apiUrl}${this.entity}/${product.id}`, product)
   }

   delete(product: Product): Observable<Product> {
     return this.http.delete<Product>(`${environment.apiUrl}${this.entity}/${product.id}`)
   }
}
