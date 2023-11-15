package com.capstone.grocery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private String reviewId;
    private String userId;
    private String reviewMessage;
    private double reviewRating;
}
