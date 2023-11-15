import { Component, OnInit } from '@angular/core';
import { Card } from './card/card.component';
import { UserService } from 'src/shared/services/user/user.service';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'admin-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  userListLength = 0;
  productListLength = 0;
  adminCard: Card[] = [];

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.userListLength = res.data.length;
        this.populateAdminCards();
      },
    });
    this.productService.getPaginatedProducts('?', 1, 1, '', '').subscribe({
      next: (res) => {
        this.productListLength = res.data.totalElements;
        this.populateAdminCards();
      },
    });
  }

  populateAdminCards() {
    this.adminCard = [
      {
        title: 'Users',
        description: ''+this.userListLength,
        color: 'success',
        icon: "bi-person",
        routerLink: "users"
      },
      {
        title: 'Products',
        description: ''+this.productListLength,
        color: 'primary',
        icon: "bi-cart",
        routerLink: "products"
      },
    ];
  }
}
