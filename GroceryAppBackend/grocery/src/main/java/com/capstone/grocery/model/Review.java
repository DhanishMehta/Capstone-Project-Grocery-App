package com.capstone.grocery.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Review {
    private String reviewId;
    private String userId;
    private String reviewMessage;
    private double reviewRating;
}
