import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { CartService } from 'src/shared/services/cart/cart.service';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalCartItems = '';
  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItemsCount();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  isAdmin() {
    return this.isLoggedIn() && this.authService.getRole() === "ADMIN";
  }

  getCartItemsCount() {
    this.cartService.cart$.subscribe({
      next: (res) => {
        this.totalCartItems = res.cartItems.length.toString();
      }
    })
  }

}
