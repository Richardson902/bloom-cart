package com.example.bloomcart.controller;

import com.example.bloomcart.dto.OrderDto;
import com.example.bloomcart.dto.ProductDto;
import com.example.bloomcart.dto.UserDto;
import com.example.bloomcart.service.OrderService;
import com.example.bloomcart.service.ProductService;
import com.example.bloomcart.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/")
public class AdminController {

    private final UserService userService;
    private final ProductService productService;
    private final OrderService orderService;

    public AdminController(UserService userService, ProductService productService, OrderService orderService) {
        this.userService = userService;
        this.productService = productService;
        this.orderService = orderService;
    }

    @GetMapping("users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("users/{id}")
    public ResponseEntity<UserDto> updateUserRole(@PathVariable("id") Long id, @RequestBody String role) {
        UserDto updatedUser = userService.updateUserRole(id, role);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("products")
    public ResponseEntity<ProductDto> createProduct(@RequestPart ProductDto productDto, @RequestPart MultipartFile imageFile) throws IOException {
        ProductDto createdProduct = productService.createNewProduct(productDto, imageFile);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("products/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable("id") Long id, @RequestPart ProductDto productDto, @RequestPart MultipartFile imageFile) throws IOException {
        ProductDto updatedProduct = productService.updateProductInfo(id, productDto, imageFile);
        return ResponseEntity.ok(updatedProduct);
    }

    @PutMapping("products/stock{id}")
    public ResponseEntity<ProductDto> updateProductStock(@PathVariable("id") Long id, @RequestBody ProductDto productDto) {
        ProductDto updatedProduct = productService.updateProductStock(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("orders")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("orders/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("orders/{id}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }


}
