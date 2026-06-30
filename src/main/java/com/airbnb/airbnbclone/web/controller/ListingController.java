package com.airbnb.airbnbclone.web.controller;

import com.airbnb.airbnbclone.model.domain.enums.ListingCategory;
import com.airbnb.airbnbclone.model.dto.ListingDTO;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.service.application.ListingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<ListingDTO>> getAllListings() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDTO> getListingById(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListingById(id));
    }

    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<ListingDTO>> getListingsByCity(@PathVariable Long cityId) {
        return ResponseEntity.ok(listingService.getListingsByCity(cityId));
    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<ListingDTO>> getListingsByHost(@PathVariable Long hostId) {
        return ResponseEntity.ok(listingService.getListingsByHost(hostId));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ListingDTO>> getListingsByCategory(
            @PathVariable ListingCategory category) {
        return ResponseEntity.ok(listingService.getListingsByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ListingDTO>> searchListings(
            @RequestParam(required = false) Long cityId,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) ListingCategory category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer guests,
            @RequestParam(required = false) LocalDate checkIn,
            @RequestParam(required = false) LocalDate checkOut) {
        return ResponseEntity.ok(
                listingService.searchListings(cityId, location, category, minPrice, maxPrice, guests, checkIn, checkOut));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    public ResponseEntity<ListingDTO> createListing(
            @Valid @RequestBody ListingDTO listingDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long hostId = getIdFromUserDetails(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(listingService.createListing(listingDTO, hostId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    public ResponseEntity<ListingDTO> updateListing(
            @PathVariable Long id,
            @Valid @RequestBody ListingDTO listingDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long hostId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(listingService.updateListing(id, listingDTO, hostId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    public ResponseEntity<Void> deleteListing(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long hostId = getIdFromUserDetails(userDetails);
        listingService.deleteListing(id, hostId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/availability")
    @PreAuthorize("hasAnyRole('HOST', 'ADMIN')")
    public ResponseEntity<ListingDTO> toggleAvailability(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long hostId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(listingService.toggleAvailability(id, hostId));
    }

    private Long getIdFromUserDetails(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }
}
