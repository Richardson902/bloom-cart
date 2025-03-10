package com.example.bloomcart.service;

import com.example.bloomcart.dto.ProductDto;
import com.example.bloomcart.model.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDto createNewProduct(ProductDto productDto, MultipartFile image) throws IOException;
    ProductDto getProductById(Long id);
    List<ProductDto> getAllProducts();
    List<ProductDto> getProductsByCategory(String category);
    ProductDto updateProductInfo(Long id, ProductDto productDto, MultipartFile image) throws IOException;
    ProductDto updateProductStock(Long id, ProductDto productDto);
    void deleteProduct(Long id);
}
