package com.airbnb.airbnbclone.service.application;

import com.airbnb.airbnbclone.model.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {

    ReviewDTO createReview(ReviewDTO reviewDTO, Long guestId);

    ReviewDTO getReviewById(Long id);

    List<ReviewDTO> getReviewsByListing(Long listingId);

    List<ReviewDTO> getReviewsByGuest(Long guestId);

    void deleteReview(Long id, Long guestId);
}