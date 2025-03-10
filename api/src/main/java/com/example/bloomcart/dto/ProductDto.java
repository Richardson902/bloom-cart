package com.example.bloomcart.dto;

import com.example.bloomcart.model.Product;
import jakarta.persistence.Lob;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String category;
    private String imageName;
    private String imageType;
    private byte[] imageData;
}
