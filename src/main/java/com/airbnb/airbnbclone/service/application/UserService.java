package com.airbnb.airbnbclone.service.application;

import com.airbnb.airbnbclone.model.domain.User;
import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
    Optional<User> findByEmail(String email);
}