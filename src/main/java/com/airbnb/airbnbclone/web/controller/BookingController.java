package com.airbnb.airbnbclone.web.controller;

import com.airbnb.airbnbclone.model.dto.BookingDTO;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.service.application.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<BookingDTO>> getMyBookings(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long guestId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(bookingService.getBookingsByGuest(guestId));
    }

    @GetMapping("/host")
    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    public ResponseEntity<List<BookingDTO>> getHostBookings(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long hostId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(bookingService.getBookingsByHost(hostId));
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<BookingDTO>> getBookingsByListing(@PathVariable Long listingId) {
        return ResponseEntity.ok(bookingService.getBookingsByListing(listingId));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BookingDTO> createBooking(
            @Valid @RequestBody BookingDTO bookingDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Long guestId = getIdFromUserDetails(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookingService.createBooking(bookingDTO, guestId));
    }

    @PatchMapping("/{id}/confirm")
    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    public ResponseEntity<BookingDTO> confirmBooking(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long hostId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(bookingService.confirmBooking(id, hostId));
    }

    @PatchMapping("/{id}/cancel")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BookingDTO> cancelBooking(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(bookingService.cancelBooking(id, userId));
    }

    private Long getIdFromUserDetails(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }
}