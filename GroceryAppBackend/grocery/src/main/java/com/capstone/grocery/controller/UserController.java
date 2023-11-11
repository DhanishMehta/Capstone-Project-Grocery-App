package com.capstone.grocery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.grocery.model.User;
import com.capstone.grocery.response.CommonResponse;
import com.capstone.grocery.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public CommonResponse<List<User>> getAllUsers(){
        return userService.getAllUsers(); 
    } 

    @GetMapping("/{userId}")
    public CommonResponse<User> getUserById(@PathVariable String userId){
        return userService.getUserById(userId); 
    }

    @PostMapping
    public CommonResponse<User> postNewUser(@RequestBody User user){
        return userService.postNewUser(user);
    }

    @PutMapping("/{userId}")
    public CommonResponse<User> updateUser(@PathVariable String userId, @RequestBody User user){
        return userService.updateUser(userId,user);
    }

    @DeleteMapping("/{userId}")
    public CommonResponse<User> deleteUser(@PathVariable String userId){
        return userService.deleteUser(userId);
    }
    
}