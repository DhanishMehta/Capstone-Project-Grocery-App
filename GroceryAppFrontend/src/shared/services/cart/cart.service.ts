import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Cart, User } from 'src/shared/model/userModel';
import { UserService } from '../user/user.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CommonReponse } from 'src/shared/model/reqResModel';
import { SERVER_API_BASE_URL } from 'src/shared/model/utility';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  initialCart: Cart = {
    cartItems: [],
    cartTotal: 0,
  };
  cart: BehaviorSubject<Cart> = new BehaviorSubject(this.initialCart);
  cart$ = this.cart.asObservable();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {
    console.warn('INSIDE CART SERVICE NGONINIT..!  ');
    this.getCart();
  }

  ngOnInit(): void {}

  getHeader(token: string): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getUserId() {
    return this.authService.getUserId()!;
  }
  
  getCart() {
    console.log('inside get cart!!');
    const userId = this.getUserId();
    if (userId !== null) {
      console.log(userId);
      this.userService.getUserById(userId).subscribe({
        next: (res) => {
          if (res.data.cart !== null && res.data.cart)
            this.initialCart = res.data.cart;
          else
            this.initialCart = {
              cartItems: [],
              cartTotal: 0,
            };
          this.cart.next(this.initialCart);
          console.warn('Cart updated');
          console.warn(this.initialCart);
        },
        error: (er) => {
          console.warn('error incoming from cart service!!');
          console.error(er);
        },
      });
    }
  }

  addToCart(productId: string) {
    const userId = this.getUserId();
    const token = this.authService.getToken();
    this.http
      .post<CommonReponse<User>>(
        SERVER_API_BASE_URL + `/cart/add/${productId}/to/${userId}`,
        null,
        { headers: this.getHeader(token ?? '') }
      )
      .subscribe({
        next: (res) => {
          this.initialCart = res.data.cart!;
          this.cart.next(this.initialCart);
          console.log(res);
        },
        error: (er) => {
          console.error(er);
        },
      });
  }

  deleteFromCart(productId: string) {
    console.warn('inside delete from cart');

    const userId = this.getUserId();
    const token = this.authService.getToken();
    console.log(token);
    this.http
      .delete<CommonReponse<User>>(
        SERVER_API_BASE_URL + `/cart/remove/${productId}/from/${userId}`,
        { headers: this.getHeader(token ?? '') }
      )
      .subscribe({
        next: (res) => {
          this.initialCart = res.data.cart!;
          this.cart.next(this.initialCart);
          console.warn('cart updated');
        },
        error: (er) => {
          console.warn('error incoming from delete in cartservice');
          console.error(er);
        },
      });
  }
}
