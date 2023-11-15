import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/shared/model/productModel';
import { CartService } from 'src/shared/services/cart/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() eventEmitter: EventEmitter<Product> = new EventEmitter();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
      
  }

  handleEmit() {
    this.eventEmitter.emit(this.product);
  }

  addToCart(){
    this.cartService.addToCart(this.product.id!);
    console.log("Item added to cart");
    this.handleEmit();
  }
  addToWishlist(){
    this.handleEmit();
    
  }
  quickView(){
    this.handleEmit();

  }
}
