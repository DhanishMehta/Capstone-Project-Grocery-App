package com.capstone.grocery.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
        
    @Id
    private String userId;
    private String userFirstName;
    private String userLastName;
    private String userPhone;
    private String userEmail;
    private String userEncryptedPassword;
    private List<Address> userSavedAddresses;
    private UserRole userRole;
    private Cart cart;
    
    public void setAllAttributes(User newUser){
        this.userFirstName = newUser.userFirstName;
        this.userLastName = newUser.userLastName;
        this.userPhone = newUser.userPhone;
        this.userEmail = newUser.userEmail;
        this.userEncryptedPassword = newUser.userEncryptedPassword;
        this.userSavedAddresses = newUser.userSavedAddresses;
        this.userRole = newUser.userRole;
        this.cart = newUser.cart;
    }

}
