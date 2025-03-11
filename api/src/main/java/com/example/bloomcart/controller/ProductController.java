package com.example.bloomcart.controller;

import com.example.bloomcart.dto.ProductDto;
import com.example.bloomcart.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product Controller", description = "API for product management")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ProductDto> createProduct(@RequestPart ProductDto productDto, @RequestPart MultipartFile imageFile) throws IOException {
        ProductDto createdProduct = productService.createNewProduct(productDto, imageFile);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable long id) {
        ProductDto productDto = productService.getProductById(id);

        byte[] imageFile = productDto.getImageData();

        return ResponseEntity.ok().contentType(MediaType.valueOf(productDto.getImageType()))
                .body(imageFile);
    }

    @GetMapping
    @Operation(summary = "Get all products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update product information")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Long id, @RequestPart ProductDto productDto, @RequestPart MultipartFile imageFile) throws IOException {
        ProductDto updatedProduct = productService.updateProductInfo(id, productDto, imageFile);
        return ResponseEntity.ok(updatedProduct);
    }

    @PutMapping("/stock{id}")
    @Operation(summary = "Update product stock quantity")
    public ResponseEntity<ProductDto> updateProductStock(@PathVariable("id") Long id, @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProductStock(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product by ID")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
