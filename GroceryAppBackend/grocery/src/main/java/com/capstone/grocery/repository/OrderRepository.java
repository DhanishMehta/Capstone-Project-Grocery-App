package com.capstone.grocery.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.capstone.grocery.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
    
}
