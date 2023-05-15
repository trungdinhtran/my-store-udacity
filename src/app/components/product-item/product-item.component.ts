import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

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
  ) {}

  ngOnInit(): void {}

  selectedQuantity(value: any) {
    this.selected = value;
  }

  refresh(): void {
    window.location.reload();
  }
}
