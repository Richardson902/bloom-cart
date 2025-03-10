package com.example.bloomcart.repository;

import com.example.bloomcart.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
