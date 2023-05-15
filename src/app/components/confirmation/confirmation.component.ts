import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  storage = window.localStorage;
  fullName: string | null = '';
  totalCart: number = 0

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fullName = this.storage.getItem('fullName');
    this.totalCart = Number(this.storage.getItem('totalCart'));
  }
  backToProductList(){
    this.router.navigate(['/'])
  }
}
