package com.example.bloomcart.mapper;

import com.example.bloomcart.dto.ReviewDto;
import com.example.bloomcart.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ReviewMapper {
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    ReviewDto toDto(Review review);

    @Mapping(target = "product", ignore = true)
    Review toEntity(ReviewDto dto);
}
