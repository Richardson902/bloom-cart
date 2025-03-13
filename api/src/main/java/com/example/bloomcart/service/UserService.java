package com.example.bloomcart.service;

import com.example.bloomcart.dto.UpdateUserDto;
import com.example.bloomcart.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    UserDto updateUserInfo(Long id, UpdateUserDto updateUserDto);
    UserDto updateUserRole(Long id, String role);
    void deleteUser(Long id);

    String verify(UserDto userDto);
}
