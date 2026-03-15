package com.airbnb.airbnbclone.model.dto;

import com.airbnb.airbnbclone.model.domain.enums.BookingStatus;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {

    private Long id;

    @NotNull(message = "Listing is required")
    private Long listingId;

    private String listingTitle;

    private Long guestId;

    private String guestName;

    @NotNull(message = "Check-in date is required")
    @FutureOrPresent(message = "Check-in date must be today or in the future")
    private LocalDate checkInDate;

    @NotNull(message = "Check-out date is required")
    @Future(message = "Check-out date must be in the future")
    private LocalDate checkOutDate;

    @NotNull(message = "Number of guests is required")
    @Min(value = 1, message = "Must have at least 1 guest")
    private Integer numberOfGuests;

    private BigDecimal totalPrice;

    private BookingStatus status;
}