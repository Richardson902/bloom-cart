package com.example.bloomcart.service;

import com.example.bloomcart.dto.UpdateUserDto;
import com.example.bloomcart.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    UserDto updateUser(Long id, UpdateUserDto updateUserDto);
    void deleteUser(Long id);
}
