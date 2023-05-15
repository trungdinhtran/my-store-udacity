import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent {

  productList: Product[] = [];
  productId: number = -1;
  productInfo!: Product;
  productQuantity: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  selected:number = 1;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
    });

    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      this.productInfo = this.getProductInfo(this.productId);
    });
  }
  getProductInfo(id: number) {
    console.log("OK", this.productList, this.productId)
    return this.productList.filter((obj) => obj.id === id )[0];
  }
  selectedQuantity(value: any) {
    this.selected = value;
  }

}
