package com.example.bloomcart.dto;

import com.example.bloomcart.model.Order;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class OrderDto {
    private Long id;
    private String recipientName;
    private String street;
    private String city;
    private String province;
    private String postalCode;
    private String phoneNumber;
    private LocalDateTime deliveryDate;
    private BigDecimal totalPrice;
    private String status;
    private Set<OrderItemDto> orderItems;
}
