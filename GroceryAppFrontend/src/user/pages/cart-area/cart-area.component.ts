import { Component } from '@angular/core';
import { Cart } from 'src/shared/model/userModel';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { CartService } from 'src/shared/services/cart/cart.service';
import { UserService } from 'src/shared/services/user/user.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-cart-area',
  templateUrl: './cart-area.component.html',
  styleUrls: ['./cart-area.component.scss'],
})
export class CartAreaComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isLoading = true;
  cart!: Cart;
  displayCart: boolean = false;
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCart() {
    if (this.authService.isLoggedIn()) {
      const sub = this.cartService.cart$.subscribe({
        next: (data) => {
          this.cart = data;
          this.displayCart = true;
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        },
        error: (er) => {
          console.error(er);
        },
      });
      this.subscriptions.push(sub);
    }
  }

  deleteFromCart(productId: string) {
    this.cartService.deleteFromCart(productId);
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId);
  }

  removeEntireProduct(productId: string) {}

  displayTotal(qty: number, itemPrice: string) {
    return (Number(qty) * Number(itemPrice)).toFixed(2);
  }
}
