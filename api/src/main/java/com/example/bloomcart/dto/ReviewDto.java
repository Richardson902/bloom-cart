package com.example.bloomcart.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private String comment;
    private Integer rating;
    private Long productId;
    private String productName;
}
