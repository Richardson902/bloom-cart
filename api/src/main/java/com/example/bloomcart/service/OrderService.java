package com.example.bloomcart.service;

import com.example.bloomcart.dto.OrderDto;
import com.example.bloomcart.dto.ProductDto;

import java.util.List;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDto);
    List<OrderDto> getAllOrders();
    OrderDto getOrderById(long orderId);
    OrderDto updateOrderStatus(Long id, String status);
}
