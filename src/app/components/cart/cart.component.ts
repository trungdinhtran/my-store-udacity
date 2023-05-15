import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  storage = window.localStorage;
  productInCart: Product[] = [];
  userForm!: FormGroup;
  submitted = false;
  @Output() userInfo = new EventEmitter();
  productQuantity: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  selected = "";
  totalCart: number = 0

  constructor(
    private productService: ProductService,
    private fromBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productInCart = this.productService.getProductInCart();
    this.userForm = this.fromBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]{16}$')]],
    });
    this.getTotalCart();
  }
  onSubmit() {
    this.userInfo.emit(this.userForm.value);
  }

  get fullName() {
    return this.userForm.get('fullName');
  }
  get address() {
    return this.userForm.get('address');
  }
  get cardNumber() {
    return this.userForm.get('cardNumber');
  }

  getTotalCart(){
    let total = 0;
    for(let i = 0; i< this.productInCart.length; i++){
      total += this.productInCart[i].price * this.productInCart[i].total;
    }
    this.totalCart = total;
  }

  selectedQuantity(value: any, product: Product) {
    let indexOfProduct = this.productInCart.indexOf(product);
    this.productInCart[indexOfProduct].total = Number(value);
    this.selected = value;
    this.storage.setItem('listProduct', JSON.stringify(this.productInCart));
    this.getTotalCart()
    window.location.reload();
  }

  deleteProductInCart(product: Product){
    let indexOfProduct = this.productInCart.indexOf(product);
    this.productInCart.splice(indexOfProduct, 1);
    this.storage.setItem('listProduct', JSON.stringify(this.productInCart));
    this.getTotalCart()
    window.location.reload();
  }

  convert(value: any){
    return Number(value);
  }
  confirmationOrder(value: any){
    console.log(value.value, value)
    this.storage.setItem('fullName', value.value);
    this.storage.setItem('totalCart', JSON.stringify(this.totalCart));
    this.router.navigate(['/confirmation'])
  }
}
