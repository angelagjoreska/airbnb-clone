package com.airbnb.airbnbclone.service.application;

import com.airbnb.airbnbclone.model.dto.auth.AuthResponse;
import com.airbnb.airbnbclone.model.dto.auth.LoginRequest;
import com.airbnb.airbnbclone.model.dto.auth.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}