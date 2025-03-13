package com.example.bloomcart.controller;

import com.example.bloomcart.dto.UpdateUserDto;
import com.example.bloomcart.dto.UserDto;
import com.example.bloomcart.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@Tag(name = "User Controller", description = "API for user management")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("auth/register")
    @Operation(summary = "Create a new user")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto userDto) {
        userService.createUser(userDto);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("auth/login")
    @Operation(summary = "Log in user")
    public String login(@RequestBody UserDto userDto) {
        return userService.verify(userDto);
    }

    @GetMapping("users/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long id) {
        UserDto userDto = userService.getUserById(id);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("users/{id}")
    @Operation(summary = "Update a user by ID")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long id, @Valid @RequestBody UpdateUserDto updateUserDto) {
        UserDto updatedUser = userService.updateUserInfo(id, updateUserDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("users/{id}")
    @Operation(summary = "Delete user by ID")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
