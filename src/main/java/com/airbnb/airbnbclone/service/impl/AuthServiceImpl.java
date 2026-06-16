package com.airbnb.airbnbclone.service.impl;

import com.airbnb.airbnbclone.model.domain.User;
import com.airbnb.airbnbclone.model.domain.enums.UserRole;
import com.airbnb.airbnbclone.model.dto.auth.AuthResponse;
import com.airbnb.airbnbclone.model.dto.auth.LoginRequest;
import com.airbnb.airbnbclone.model.dto.auth.RegisterRequest;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.security.JwtTokenProvider;
import com.airbnb.airbnbclone.service.application.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(UserRole.GUEST);
        user.setIsActive(true);

        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }
}