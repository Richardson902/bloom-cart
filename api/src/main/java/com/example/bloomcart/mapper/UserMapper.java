package com.example.bloomcart.mapper;

import com.example.bloomcart.dto.UserDto;
import com.example.bloomcart.model.User;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto userDto);
}
