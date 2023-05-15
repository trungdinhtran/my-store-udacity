import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  storage = window.localStorage;
  productDataUrl = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) {

   }

  getProducts(): Observable<[]> {
    return this.http.get<[]>(this.productDataUrl);
  }

  storeProduct(product: Product, total: number){
    const products:Product[] = this.getProductInCart();
    let existProduct = products.find((obj) => obj.id === product.id);
    if(existProduct){
      existProduct.total = total;
    }else{
      product.total = total;
      products.push(product);
    }
    this.storage.setItem('listProduct', JSON.stringify(products));
    console.log(this.getProductInCart())
  }

  getProductInCart() {
    const getProduct = this.storage.getItem('listProduct');
    return getProduct ? JSON.parse(getProduct) : [];
  }

}
