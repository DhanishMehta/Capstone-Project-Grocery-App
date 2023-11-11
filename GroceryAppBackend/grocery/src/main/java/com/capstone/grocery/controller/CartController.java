package com.capstone.grocery.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.grocery.model.User;
import com.capstone.grocery.response.CommonResponse;
import com.capstone.grocery.service.CartService;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @PostMapping("/add/{productId}/to/{userId}")
    public CommonResponse<User> addProductToCart(@PathVariable String productId, @PathVariable String userId){
        return cartService.addProductToCart(productId, userId);
    }

    @DeleteMapping("/remove/{productId}/from/{userId}")
    public CommonResponse<User> removeProductFromCart(@PathVariable String productId, @PathVariable String userId){
        return cartService.removeProductFromCart(productId, userId);
    }
}
