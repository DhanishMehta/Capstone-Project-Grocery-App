package com.capstone.grocery.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.capstone.grocery.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    
}
