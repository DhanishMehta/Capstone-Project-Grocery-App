package com.capstone.grocery.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Cart {

    private List<CartItem> cartItems;
    private double cartTotal;
    
    public double getCartTotal() {
        this.cartTotal = 0;
        for (CartItem cartItem : cartItems) {
            this.cartTotal += Integer.parseInt(cartItem.getCartItemProduct().getPricing().getDiscount().getMrp()) * cartItem.getCartItemQuantity();
        }
        return this.cartTotal;
    }
}
