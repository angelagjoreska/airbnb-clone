package com.airbnb.airbnbclone.model.dto;

import com.airbnb.airbnbclone.model.domain.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String profilePicture;
    private UserRole role;
}