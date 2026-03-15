package com.airbnb.airbnbclone.web.controller;

import com.airbnb.airbnbclone.model.domain.User;
import com.airbnb.airbnbclone.service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PostMapping
    public User createUser(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password
    ) {
        return userService.create(name, email, password);
    }
}
