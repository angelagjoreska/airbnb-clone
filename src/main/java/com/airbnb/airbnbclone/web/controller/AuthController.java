package com.airbnb.airbnbclone.web.controller;

import com.airbnb.airbnbclone.model.dto.auth.AuthResponse;
import com.airbnb.airbnbclone.model.dto.auth.LoginRequest;
import com.airbnb.airbnbclone.model.dto.auth.RegisterRequest;
import com.airbnb.airbnbclone.service.application.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}