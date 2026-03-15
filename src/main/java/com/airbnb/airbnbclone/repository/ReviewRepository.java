package com.airbnb.airbnbclone.repository;

import com.airbnb.airbnbclone.model.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByListingId(Long listingId);

    List<Review> findByGuestId(Long guestId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.listing.id = :listingId")
    Double findAverageRatingByListingId(@Param("listingId") Long listingId);

    boolean existsByListingIdAndGuestId(Long listingId, Long guestId);
}