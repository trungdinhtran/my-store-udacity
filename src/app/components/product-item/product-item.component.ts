import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() productInfo!: Product;
  selected = '1';
  productQuantity: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  selectedQuantity(value: any) {
    this.selected = value;
    console.log(this.selected)
  }

  addProduct(product: Product){
    this.productService.storeProduct(product, Number(this.selected))
    alert("Product is added to cart");
  }

  refresh(): void {
    window.location.reload();
  }
}
