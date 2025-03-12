package com.example.bloomcart.controller;

import com.example.bloomcart.dto.ReviewDto;
import com.example.bloomcart.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Review Controller", description = "API for review management")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/products/{productId}")
    @Operation(summary = "Create a new review")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<ReviewDto> createReview(@PathVariable("productId") Long productId, @RequestBody ReviewDto reviewDto) {
        ReviewDto createdReview = reviewService.createReview(productId, reviewDto);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    @GetMapping("/products/{productId}")
    @Operation(summary = "Get all reviews for a product")
    public ResponseEntity<List<ReviewDto>> getReviewsByProductId(@PathVariable("productId") Long productId) {
        List<ReviewDto> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }
}
