import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productDataUrl = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) {

   }

   getProducts(): Observable<[]> {
    return this.http.get<[]>(this.productDataUrl);
  }

}
