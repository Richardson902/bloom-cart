package com.example.bloomcart.service;

import com.example.bloomcart.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(Long productId, ReviewDto reviewDto);
    List<ReviewDto> getReviewsByProductId(Long productId);
}
