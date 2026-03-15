package com.airbnb.airbnbclone.service.impl;

import com.airbnb.airbnbclone.exception.ResourceNotFoundException;
import com.airbnb.airbnbclone.exception.UnauthorizedException;
import com.airbnb.airbnbclone.model.domain.Listing;
import com.airbnb.airbnbclone.model.domain.Review;
import com.airbnb.airbnbclone.model.domain.User;
import com.airbnb.airbnbclone.model.dto.ReviewDTO;
import com.airbnb.airbnbclone.repository.ListingRepository;
import com.airbnb.airbnbclone.repository.ReviewRepository;
import com.airbnb.airbnbclone.repository.UserRepository;
import com.airbnb.airbnbclone.service.application.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO, Long guestId) {
        User guest = userRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + guestId));

        Listing listing = listingRepository.findById(reviewDTO.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + reviewDTO.getListingId()));

        if (reviewRepository.existsByListingIdAndGuestId(listing.getId(), guestId)) {
            throw new RuntimeException("You have already reviewed this listing");
        }

        Review review = Review.builder()
                .listing(listing)
                .guest(guest)
                .rating(reviewDTO.getRating())
                .comment(reviewDTO.getComment())
                .build();

        return mapToDTO(reviewRepository.save(review));
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        return mapToDTO(review);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByListing(Long listingId) {
        return reviewRepository.findByListingId(listingId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByGuest(Long guestId) {
        return reviewRepository.findByGuestId(guestId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReview(Long id, Long guestId) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));

        if (!review.getGuest().getId().equals(guestId)) {
            throw new UnauthorizedException("You are not authorized to delete this review");
        }

        reviewRepository.delete(review);
    }

    private ReviewDTO mapToDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .listingId(review.getListing().getId())
                .listingTitle(review.getListing().getTitle())
                .guestId(review.getGuest().getId())
                .guestName(review.getGuest().getFirstName() + " " + review.getGuest().getLastName())
                .rating(review.getRating())
                .comment(review.getComment())
                .build();
    }
}