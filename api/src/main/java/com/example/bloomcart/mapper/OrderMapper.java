package com.example.bloomcart.mapper;

import com.example.bloomcart.dto.OrderDto;
import com.example.bloomcart.dto.OrderItemDto;
import com.example.bloomcart.model.Order;
import com.example.bloomcart.model.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderMapper {
    
    OrderDto toDto(Order order);
    
    @Mapping(target = "orderItems", ignore = true)
    Order toEntity(OrderDto orderDto);
    
    @AfterMapping
    default void linkOrderItems(@MappingTarget Order order) {
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                item.setOrder(order);
            }
        }
    }
    
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productId", source = "product.id")
    OrderItemDto toOrderItemDto(OrderItem orderItem);
    
    @Mapping(target = "product.id", source = "productId")
    @Mapping(target = "order", ignore = true)
    OrderItem toOrderItemEntity(OrderItemDto orderItemDto);
}