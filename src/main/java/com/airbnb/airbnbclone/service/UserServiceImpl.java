package com.airbnb.airbnbclone.service;

import com.airbnb.airbnbclone.model.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserServiceImpl {

    List<User> findAll();

    Optional<User> findById(Long id);

    User create(String name, String email, String password);

}
