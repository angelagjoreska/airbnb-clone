package com.airbnb.airbnbclone.model.dto;

import com.airbnb.airbnbclone.model.domain.enums.ListingCategory;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 100, message = "Title must be between 5 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 20, max = 2000, message = "Description must be between 20 and 2000 characters")
    private String description;

    @NotNull(message = "Price per night is required")
    @DecimalMin(value = "1.0", message = "Price must be at least 1.0")
    private BigDecimal pricePerNight;

    @NotNull(message = "Max guests is required")
    @Min(value = 1, message = "Must allow at least 1 guest")
    @Max(value = 50, message = "Cannot exceed 50 guests")
    private Integer maxGuests;

    @NotNull(message = "Category is required")
    private ListingCategory category;

    @NotNull(message = "City is required")
    private Long cityId;

    private String cityName;

    private Long hostId;

    private String hostName;

    private List<String> imageUrls;

    private Double averageRating;

    private Integer totalReviews;

    private Boolean isAvailable;

    private Integer bedrooms;

    private Integer bathrooms;

    private List<String> amenities;
}