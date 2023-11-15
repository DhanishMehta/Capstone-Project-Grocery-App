import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/shared/model/productModel';
import { CartItem } from 'src/shared/model/userModel';
import { CartService } from 'src/shared/services/cart/cart.service';

@Component({
  selector: 'user-quick-view-modal',
  templateUrl: './quick-view-modal.component.html',
  styleUrls: ['./quick-view-modal.component.scss'],
})
export class QuickViewModalComponent implements OnInit {
  @Input() product!: Product;
  isAddedToCart = false;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.checkIsAddedToCart();
  }

  checkIsAddedToCart() {
    this.cartService.cart$.subscribe({
      next: (res) => {
        const index = res.cartItems.findIndex(
          (item: CartItem) => item.cartItemProduct === this.product
        );
        if (index !== -1) this.isAddedToCart = true;
        else this.isAddedToCart = false;
      },
    });
  }
}
