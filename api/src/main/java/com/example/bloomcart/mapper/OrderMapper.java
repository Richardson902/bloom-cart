package com.example.bloomcart.mapper;

import com.example.bloomcart.dto.OrderDto;
import com.example.bloomcart.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface OrderMapper {
    @Mapping(source = "user.id", target = "userId")
    OrderDto toDto(Order order);

    @Mapping(target = "user", ignore = true)
    Order toEntity(OrderDto orderDto);
}
