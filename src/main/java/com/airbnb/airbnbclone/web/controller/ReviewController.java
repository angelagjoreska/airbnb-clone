package com.airbnb.airbnbclone.web.controller;

import com.airbnb.airbnbclone.model.dto.ReviewDTO;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.service.application.ReviewService;
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
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByListing(@PathVariable Long listingId) {
        return ResponseEntity.ok(reviewService.getReviewsByListing(listingId));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ReviewDTO>> getMyReviews(
            @AuthenticationPrincipal UserDetails userDetails) {
        Long guestId = getIdFromUserDetails(userDetails);
        return ResponseEntity.ok(reviewService.getReviewsByGuest(guestId));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewDTO> createReview(
            @Valid @RequestBody ReviewDTO reviewDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long guestId = getIdFromUserDetails(userDetails);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(reviewDTO, guestId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long guestId = getIdFromUserDetails(userDetails);
        reviewService.deleteReview(id, guestId);
        return ResponseEntity.noContent().build();
    }

    private Long getIdFromUserDetails(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }
}